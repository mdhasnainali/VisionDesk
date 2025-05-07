from fastapi import FastAPI, BackgroundTasks
from tasks import process_frames
from models import TableBoundingBox
from typing import List

app = FastAPI()

# In-memory storage for table bounding boxes
table_bounding_boxes = []

@app.on_event("startup")
async def startup_event():
    print("FastAPI app has started.")

@app.get("/system-start")
async def process_video(background_tasks: BackgroundTasks):
    background_tasks.add_task(process_frames, table_bounding_boxes)
    return {"message": "Video processing started in the background."}

@app.get("/tables")
async def get_table_bounding_boxes():
    return {"table_bounding_boxes": table_bounding_boxes}

@app.post("/tables")
async def set_table_bounding_boxes(bounding_boxes: List[TableBoundingBox]):
    global table_bounding_boxes
    table_bounding_boxes = bounding_boxes
    print(table_bounding_boxes)
    return {"message": "Table bounding boxes updated successfully."}