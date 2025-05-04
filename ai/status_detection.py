import cv2
import time
from ultralytics import YOLO
from enum import Enum

# No of Person & Desk
# No of Working Vs Idle
# Desk Status
# 100 ms Inference
# 


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
VIDEO_SOURCE = './videos/demo6.mp4'  # 0/1 for webcam or path to video file

# ---------------------------
# DETECTION MODELS
# ---------------------------
yolo_model = YOLO('./models/best_new.pt')  # Ensure this model is trained to detect the 3 status classes

# ---------------------------
# HELPERS
# ---------------------------
def get_color(status):
    if status == EmployeStatus.WORKING:
        return (0, 255, 0)     # Green for working
    elif status == EmployeStatus.IDLE:
        return (0, 165, 255)   # Orange for idle
    else:
        return (0, 0, 255)     # Red for AWAY_FROM_DESK

# ---------------------------
# MAIN 
# ---------------------------
def main():
    cap = cv2.VideoCapture(VIDEO_SOURCE)
    
    while True:
        success, frame = cap.read()
        if not success:
            break
            
        height, width, _ = frame.shape
        
        # Add timestamp to the frame
        current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        cv2.putText(frame, current_time, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 
                   0.6, (255, 255, 255), 2)

        # Detect persons and their statuses
        results = yolo_model(frame, verbose=False, conf=0.01)[0]

        # Process detections with confidence
        detected_persons = 0
        for i in range(len(results.boxes)):
            conf = results.boxes.conf[i].item()
            class_id = int(results.boxes.cls[i].item())  # Get class ID directly
            
            # Ensure confidence is sufficient
            if conf >= 0.3:
                box = results.boxes.xyxy[i].cpu().numpy()  # [x1, y1, x2, y2]
                x1, y1, x2, y2 = map(int, box)
                
                # Increment person count
                detected_persons += 1
                
                # Get status based on class ID
                status = EmployeStatus(class_id)
                
                # Calculate center point (for visualization)
                cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
                
                # Draw person box
                cv2.rectangle(frame, (x1, y1), (x2, y2), get_color(status), 2)
                
                # Show person center
                cv2.circle(frame, (cx, cy), 5, (0, 255, 0), -1)
                
                # Display status label above the person
                label = f'Status: {status.name}'
                cv2.putText(frame, label, (x1, y1 - 10), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, get_color(status), 2)
        
        # Display person count
        cv2.putText(frame, f"People detected: {detected_persons}", (10, 60), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
        
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
