import cv2
import numpy as np
import time
import os

os.environ['OPENCV_FFMPEG_CAPTURE_OPTIONS'] = "rtsp_transport;tcp|buffer_size;1048576"

FRAMERATE = 60
sleep_time = 1 / FRAMERATE

def stack_2x2(arr_list):
    assert len(arr_list) == 4, "You must provide exactly 4 arrays"
    
    top = np.hstack((arr_list[0], arr_list[1]))
    bottom = np.hstack((arr_list[2], arr_list[3]))
    result = np.vstack((top, bottom))
    
    return result


# Replace with your camera info
username = 'admin'
password = 'HomeCamera2025'
ips = [
    '192.168.0.200',
    # '192.168.0.6',
    # '192.168.0.5',
    # '192.168.0.110',
]

caps_w_url = []
for ip in ips:
    # RTSP URL format
    rtsp_url = f'rtsp://{username}:{password}@{ip}:554/Streaming/Channels/101/?transportmode=unicast&streamtype=main'

    # Open the video stream
    caps_w_url.append([cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG), rtsp_url])


while True:
    frames = []
    for i in range(len(caps_w_url)):
        # print(cap)
        (cap, rtsp_url) = caps_w_url[i]
        if not cap.isOpened():
            print("Cannot open stream")
            exit()

        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame")
            caps_w_url[i][0] = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)
            frame = np.zeros((640, 480, 3), dtype=np.uint8)
            ret, frame = cap.read()
        # frame = cv2.resize(frame, (640, 480))
        frames.append(frame)
    # print(len(frames))
    # frame = stack_2x2(frames)
    cv2.imshow("Hikvision Feed", frame)

    if cv2.waitKey(1) == ord('q'):
        break
    if cv2.getWindowProperty("Hikvision Feed", cv2.WND_PROP_VISIBLE) <1:
        break

    time.sleep(sleep_time)

cap.release()
cv2.destroyAllWindows()
