import cv2
import redis
import time
import os
import json
from config import *

# STREAM_URL = "rtsp://localhost:8554/mystream"


class FrameBufferRedis:
    def __init__(self, stream_url, host='localhost'):
        self.redis_server = redis.Redis(host=host, port=6379, db=5)
        self.stream_url = stream_url
        self.cap = cv2.VideoCapture(stream_url)
        self.BBOX_COLOR_CODES = [
            (0, 0, 255),  # Red -> away from table
            (0, 255, 0),  # Green -> working
            (0, 165, 255),  # Orange -> idle
        ]

    def __annotate_frame(self, frame):
        # get the latest bounding boxes from Redis
        latest_bounding_boxes = self.redis_server.get("latest_bounding_boxes")
        print("latest_bounding_boxes", latest_bounding_boxes)

        if latest_bounding_boxes is None:
            cv2.putText(
                frame,
                f"No Desks are specified",
                (10, 15),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.35,
                (0, 0, 255),
                1,
            )
            return frame

        # Decode the JSON data
        bounding_boxes = json.loads(latest_bounding_boxes.decode("utf-8"))

        # draw person bounding boxes
        """
        format:
        person_bound_boxes": {
            "0": [
                120,
                180,
                200,
                260
            ],
        """
        for box in bounding_boxes["person_bound_boxes"]:
            x1, y1, x2, y2 = bounding_boxes["person_bound_boxes"][box]
            cv2.rectangle(
                frame,
                (x1, y1),
                (x2, y2),
                self.BBOX_COLOR_CODES[bounding_boxes["person_status"][box]],
                1,
            )

        # Write texts on the frame
        cv2.putText(
            frame,
            f"Total Person: {bounding_boxes['n_person']}",
            (10, 15),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.35,
            (0, 255, 0),
            1,
        )
        cv2.putText(
            frame,
            f"Total Table: {bounding_boxes['n_tables']}",
            (10, 35),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.35,
            (0, 255, 0),
            1,
        )
        cv2.putText(
            frame,
            f"Working: {bounding_boxes['person_in_the_table']}",
            (10, 55),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.35,
            (0, 255, 0),
            1,
        )
        cv2.putText(
            frame,
            f"Idle: {bounding_boxes['person_idle']}",
            (10, 75),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.35,
            (0, 255, 0),
            1,
        )
        cv2.putText(
            frame,
            f"Away from table: {bounding_boxes['person_away']}",
            (10, 95),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.35,
            (0, 255, 0),
            1,
        )

        # Dummy ML processing (convert to grayscale as an example)
        return frame

    def change_video_source(self, new_stream_url):
        self.stream_url = new_stream_url
        self.cap = cv2.VideoCapture(new_stream_url)

    def send_annotated_frames(self):
        while True:
            try:
                success, frame = self.cap.read()
                print('Captured for Annotation', success)
                if not success:
                    raise Exception('Stream disconnected.')
            except Exception as e:
                print(e)
                print('Searching for Stream')
                try:
                    self.cap = cv2.VideoCapture(self.stream_url)
                    time.sleep(DELAY_AFTER_ANNOTATING_FRAME)
                    print('Reconnected to stream')
                    continue
                except Exception as e:
                    print(e)

            annotated_frame = self.__annotate_frame(frame)

            # Store annotated frame to Redis
            _, jpeg = cv2.imencode(".jpg", annotated_frame)
            self.redis_server.set("latest_frame", jpeg.tobytes())


# Connect to Redis
# cap = cv2.VideoCapture("rtsp://192.168.1.112:8554/mystream")

# cap = cv2.VideoCapture("rtsp://admin:HomeCamera2025@192.168.0.200:554/Streaming/Channels/101/?transportmode=unicast&streamtype=main")
