from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import driver as models
from app.schemas.driver import DriverCreate, Driver
from app.crud import driver as crud_driver

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Driver)
def create_driver(driver: DriverCreate, db: Session = Depends(get_db)):
    return crud_driver.create_driver(db, driver)

@router.get("/", response_model=list[Driver])
def read_drivers(db: Session = Depends(get_db)):
    return crud_driver.get_drivers(db)

@router.delete("/{driver_id}")
def delete_driver(driver_id: int, db: Session = Depends(get_db)):
    success = crud_driver.delete_driver(db, driver_id)
    if not success:
        raise HTTPException(status_code=404, detail="Driver not found")
    return {"detail": "Driver deleted"}

@router.put("/{driver_id}", response_model=Driver)
def update_driver(driver_id: int, driver: DriverCreate, db: Session = Depends(get_db)):
    updated = crud_driver.update_driver(db, driver_id, driver)
    if not updated:
        raise HTTPException(status_code=404, detail="Driver not found")
    return updated
