from pydantic import BaseModel

class DriverCreate(BaseModel):
    name: str
    contact: str
    status: str

class Driver(BaseModel):
    id: int
    name: str
    contact: str
    status: str

    class Config:
        orm_mode = True
