import cv2
import time
from ultralytics import YOLO
import mediapipe as mp
from enum import Enum


# ---------------------------
# DEFINE STATUS
# ---------------------------
class EmployeStatus(Enum):
    AWAY_FROM_DESK = 0
    WORKING = 1
    IDLE = 2

# ---------------------------
# CONFIGURATION
# ---------------------------
VIDEO_SOURCE = './videos/demo3.mp4'  # 0/1 for webcam or path to video file
DESK_REGIONS = [                    # list of desk bounding boxes (x1, y1, x2, y2)
    (1000, 400, 1300, 800),          # Video Dim: 1920x1080
]

# ---------------------------
# DETECTION MODELS
# ---------------------------
yolo_model = YOLO('./models/yolo11n.pt') 

# Pose Estimator (MediaPipe)
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# ---------------------------
# HELPERS
# ---------------------------
def point_in_box(point, box):
    x, y = point
    x1, y1, x2, y2 = box
    return x1 < x < x2 and y1 < y < y2


def box_inside_box(inner_box, outer_box, threshold=0.9):
    """
    Check if inner_box is at least 90% inside outer_box

    """
    ix1, iy1, ix2, iy2 = inner_box
    ox1, oy1, ox2, oy2 = outer_box
    
    # Calculate the area of the inner box
    inner_area = (ix2 - ix1) * (iy2 - iy1)
    
    # Calculate intersection coordinates
    intersection_x1 = max(ix1, ox1)
    intersection_y1 = max(iy1, oy1)
    intersection_x2 = min(ix2, ox2)
    intersection_y2 = min(iy2, oy2)
    
    # Check if there's an intersection
    if intersection_x1 >= intersection_x2 or intersection_y1 >= intersection_y2:
        return False 
    
    # Calculate intersection area
    intersection_area = (intersection_x2 - intersection_x1) * (intersection_y2 - intersection_y1)
    
    # Calculate the proportion of inner box that is inside the outer box
    overlap_ratio = intersection_area / inner_area
    
    return overlap_ratio >= threshold

def get_color(status):
    if status == EmployeStatus.WORKING:
        return (0, 255, 0)     # Green for working
    elif status == EmployeStatus.IDLE:
        return (0, 165, 255)   # Orange for idle
    else:
        return (0, 0, 255)     # Red for AWAY_FROM_DESK

def classify_activity(landmarks):
    # Simple heuristic: if both wrists are above hips, user is typing/working
    left_wrist = landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
    right_wrist = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST]
    left_hip = landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
    right_hip = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]

    avg_wrist_y = (left_wrist.y + right_wrist.y) / 2
    avg_hip_y = (left_hip.y + right_hip.y) / 2

    if avg_wrist_y < avg_hip_y:
        return EmployeStatus.WORKING
    else:
        return EmployeStatus.IDLE

# ---------------------------
# MAIN 
# ---------------------------
def main():
    cap = cv2.VideoCapture(VIDEO_SOURCE)
    
    # Dictionary to track desk statuses
    desk_status = {desk_id: EmployeStatus.AWAY_FROM_DESK for desk_id in range(len(DESK_REGIONS))}

    while True:
        success, frame = cap.read()
        if not success:
            break
            
        height, width, _ = frame.shape
        
        # Add timestamp to the frame
        current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        cv2.putText(frame, current_time, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 
                   0.6, (255, 255, 255), 2)

        # 1. Detect persons
        results = yolo_model(frame, verbose=False)[0]
        # print(results.boxes.cls[3].item() )
        # break

        # Filter detections with confidence
        confident_detections = []
        for i in range(len(results.boxes)):
            conf = results.boxes.conf[i].item() 
            class_label = results.boxes.cls[i].item()

            if conf >= 0.35 and class_label == 0.0:
                box = results.boxes.xyxy[i].cpu().numpy()  # [x1, y1, x2, y2]
                confident_detections.append(box)
        
        detections = confident_detections
        
        # Display person count
        person_count = len(detections)
        cv2.putText(frame, f"People detected: {person_count}", (10, 60), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

        # 2. Draw desk boxes and status labels
        for idx, box in enumerate(DESK_REGIONS):
            x1, y1, x2, y2 = box
            
            # Draw desk box in white
            cv2.rectangle(frame, (x1, y1), (x2, y2), (255,255,255), 2)
            
            # Reset desk status to empty 
            desk_status[idx] = EmployeStatus.AWAY_FROM_DESK

        # 3. Process each detection
        for det in detections:
            x1, y1, x2, y2 = map(int, det)
            person_box = (x1, y1, x2, y2)
            
            # draw person box
            # cv2.rectangle(frame, (x1, y1), (x2, y2), get_color(desk_status[idx]), 2)
            
            # Show person center
            cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
            cv2.circle(frame, (cx, cy), 5, (0, 255, 0), -1)

            # 4. Check if any desk is inside this person's detection box
            for desk_id, desk_box in enumerate(DESK_REGIONS):
                # Check if desk is inside person detection box
                if box_inside_box(desk_box, person_box):
                    # 5. Pose estimation on the person
                    y1_roi = max(0, y1 - 100)
                    x1_roi = max(0, x1 - 100)
                    y2_roi = min(frame.shape[0], y2 + 50)
                    x2_roi = min(frame.shape[1], x2 + 50)
                    person_roi = frame[y1_roi:y2_roi, x1_roi:x2_roi]
                    rgb = cv2.cvtColor(person_roi, cv2.COLOR_BGR2RGB)
                    results_pose = pose.process(rgb)
                    status = EmployeStatus.IDLE
                    if results_pose.pose_landmarks:
                        status = classify_activity(results_pose.pose_landmarks)
                    
                    # Update desk status dictionary
                    desk_status[desk_id] = status
                    
                    # 6. Annotate and log
                    label = f'Desk {desk_id} | Status: {status}'
                    # Display label above the person
                    cv2.putText(frame, label, (x1, y1 - 10), 
                               cv2.FONT_HERSHEY_SIMPLEX, 0.5, get_color(desk_status[desk_id]), 2)
                    
                    dx1, dy1, dx2, dy2 = desk_box
                    cv2.rectangle(frame, (dx1, dy1), (dx2, dy2), (255, 0, 255), 2)  
                else:
                    status = EmployeStatus.AWAY_FROM_DESK
                    desk_status[desk_id] = status
                    label = f'Status: Away'
                    cv2.putText(frame, label, (x1, y1 - 10), 
                               cv2.FONT_HERSHEY_SIMPLEX, 0.5, get_color(desk_status[desk_id]), 2)

        # Add legend
        cv2.putText(frame, "Legend:", (width - 200, 30), 
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 255), 2)
        cv2.putText(frame, "Red: Away From Desk", (width - 200, 50), 
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
        cv2.putText(frame, "Green: Working", (width - 200, 70), 
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        cv2.putText(frame, "Orange: Idle", (width - 200, 90), 
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 165, 255), 2)

        # Display
        cv2.imshow('Employee Monitor', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    main()
