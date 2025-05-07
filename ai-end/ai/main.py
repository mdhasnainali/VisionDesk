import os
from typing import Optional, Dict, Union

from fastapi import FastAPI, BackgroundTasks, HTTPException
from tasks import *
from models import TableBoundingBox, RTSPConfig
from typing import List
from config import *
from streamer import StreamFFMPEG
from worker import FrameBufferRedis

os.environ['OPENCV_FFMPEG_CAPTURE_OPTIONS'] = "rtsp_transport;tcp"

app = FastAPI()

# In-memory storage for table bounding boxes
table_bounding_boxes = []

# Global state to track processes


video_streamer = StreamFFMPEG(rtsp_url=STREAM_SOURCE)
video_streamer.start_stream(INITIAL_VIDEO_PATH)
frame_buffer_redis = FrameBufferRedis(
    stream_url=STREAM_SOURCE)
frame_processor = FrameProcessor(STREAM_SOURCE)


@app.on_event("startup")
async def startup_event():
    print("FastAPI app has started.")


@app.on_event("shutdown")
async def shutdown_event():
    print("FastAPI app is shutting down.")
    video_streamer.stop_stream()


@app.get("/system-start")
async def process_video(background_tasks: BackgroundTasks):
    background_tasks.add_task(
        frame_processor.process_frames, table_bounding_boxes)
    return {"message": "Video processing started in the background."}


@app.get("/redis-start")
async def process_video(background_tasks: BackgroundTasks):
    background_tasks.add_task(frame_buffer_redis.send_annotated_frames)
    return {"message": "Redis started."}


@app.post("/tables")
async def set_table_bounding_boxes(bounding_boxes: List[TableBoundingBox]):
    global table_bounding_boxes
    table_bounding_boxes = bounding_boxes
    print(table_bounding_boxes)
    return {"message": "Table bounding boxes updated successfully."}


@app.post("/rtsp/control")
async def control_rtsp_stream(config: RTSPConfig):
    # If it is a cctv
    if config.cctv:
        cctv_address = f"rtsp://{config.user}:{config.password}@{config.ip}:{config.port}/Streaming/Channels/102/?transportmode=unicast&streamtype=main"
        video_streamer.stop_stream()
        frame_processor.update_video_source(cctv_address)
        frame_buffer_redis.change_video_source(cctv_address)
        return {"message": "Streaming from camera."}
    else:
        print(os.path.exists(config.video_path))
        if os.path.exists(config.video_path):
            video_streamer.start_stream(config.video_path)
            return {"message": "Started or changed demo"}
        return {"message": 'Failed to start stream.'}
