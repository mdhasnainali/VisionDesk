import cv2
import time
import requests
import numpy as np
from ultralytics import YOLO
from config import VIDEO_SOURCE, POST_ENDPOINT
from models import BoundingBox, EmployeStatus, TableBoundingBox, StatusResponse
from typing import List, Dict

yolo_model = YOLO('./models/best_new.pt')  # Ensure this model is trained to detect the 3 status classes

def is_point_in_box(point_x, point_y, box):
    """Check if a point (x,y) is inside a bounding box"""
    return (box.x1 <= point_x <= box.x2) and (box.y1 <= point_y <= box.y2)

def process_frames(table_bounding_boxes: List[TableBoundingBox] = None):
    if table_bounding_boxes is None:
        table_bounding_boxes = []
    
    cap = cv2.VideoCapture(VIDEO_SOURCE)
    
    while True:
        success, frame = cap.read()
        if not success:
            break

        # Add timestamp to the frame
        current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        cv2.putText(frame, current_time, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 
                   0.6, (255, 255, 255), 2)

        # Detect persons and their statuses
        results = yolo_model(frame, verbose=False, conf=0.01)[0]

        # Process detections with confidence
        person_bboxes = []
        person_statuses = []
        
        for i in range(len(results.boxes)):
            conf = results.boxes.conf[i].item()
            class_id = int(results.boxes.cls[i].item())  # Get class ID directly

            # Ensure confidence is sufficient
            if conf >= 0.4:
                box = results.boxes.xyxy[i].cpu().numpy()  # [x1, y1, x2, y2]
                x1, y1, x2, y2 = map(int, box)
                
                # Calculate the center of the person
                center_x = (x1 + x2) // 2
                center_y = (y1 + y2) // 2

                # Get original model status based on class ID
                model_status = EmployeStatus(class_id)
                
                # Determine if the person is at a table
                at_table = False
                table_index = -1
                
                for idx, table in enumerate(table_bounding_boxes):
                    if is_point_in_box(center_x, center_y, table):
                        at_table = True
                        table_index = idx
                        break
                

                final_status = model_status
                if not at_table and model_status != EmployeStatus.AWAY_FROM_DESK:
                    final_status = EmployeStatus.AWAY_FROM_DESK
                
                # Append person detection
                person_bboxes.append({
                    "bbox": [x1, y1, x2, y2],
                    "status": final_status,
                    "table_index": table_index
                })
                
                person_statuses.append(final_status)
        
        # Format response according to the required structure
        if person_bboxes:
            n_person = len(person_bboxes)
            n_tables = len(table_bounding_boxes)
            
            # Count statistics
            person_in_table = sum(1 for p in person_bboxes if p["table_index"] >= 0)
            person_idle = sum(1 for p in person_statuses if p == EmployeStatus.IDLE)
            person_away = sum(1 for p in person_statuses if p == EmployeStatus.AWAY_FROM_DESK)
            
            # Format person bounding boxes
            person_bound_boxes = {}
            for i, p in enumerate(person_bboxes):
                person_bound_boxes[str(i)] = p["bbox"]
            
            # Format person statuses
            person_status = {}
            for i, status in enumerate(person_statuses):
                person_status[str(i)] = status.value
            
            # Format desk-person mapping
            desk_person_map = {}
            for i in range(n_tables):
                # Find the person at this table, if any
                person_idx = -1
                for j, p in enumerate(person_bboxes):
                    if p["table_index"] == i:
                        person_idx = j
                        break
                desk_person_map[str(i)] = person_idx
            
            # Compile the response
            response_data = StatusResponse(
                n_person=n_person,
                n_tables=n_tables,
                person_in_the_table=person_in_table,
                person_idle=person_idle,
                person_away=person_away,
                person_bound_boxes=person_bound_boxes,
                person_status=person_status,
                desk_person_map=desk_person_map
            )
            
            # Send POST request
            try:
                response = requests.post(POST_ENDPOINT, json=response_data.dict())
                print(f"POST Response: {response.status_code}")
            except Exception as e:
                print(f"Error sending POST request: {e}")

        # Wait for 1 second before processing the next frame
        time.sleep(1)

    cap.release()