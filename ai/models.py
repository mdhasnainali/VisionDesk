from enum import Enum
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class EmployeStatus(Enum):
    AWAY_FROM_DESK = 0
    WORKING = 1 
    IDLE = 2

class BoundingBox(BaseModel):
    x1: int
    y1: int
    x2: int
    y2: int
    status: str
    confidence: float

class TableBoundingBox(BaseModel):
    id: int
    x1: int
    y1: int
    x2: int
    y2: int

class StatusResponse(BaseModel):
    n_person: int
    n_tables: int
    person_in_the_table: int
    person_idle: int
    person_away: int
    person_bound_boxes: Dict[str, List[int]]
    person_status: Dict[str, int]
    desk_person_map: Dict[str, int]
