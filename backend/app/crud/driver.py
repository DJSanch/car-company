# app/crud/driver.py

from sqlalchemy.orm import Session
from app.models.driver import Driver
from app.schemas.driver import DriverCreate

def create_driver(db: Session, driver: DriverCreate):
    new_driver = Driver(**driver.model_dump())
    db.add(new_driver)
    db.commit()
    db.refresh(new_driver)
    return new_driver

def get_drivers(db: Session):
    return db.query(Driver).all()

def delete_driver(db: Session, driver_id: int) -> bool:
    driver = db.query(Driver).filter(Driver.id == driver_id).first()
    if not driver:
        return False
    db.delete(driver)
    db.commit()
    return True

def update_driver(db: Session, driver_id: int, updated: DriverCreate):
    driver = db.query(Driver).filter(Driver.id == driver_id).first()
    if not driver:
        return None
    for key, value in updated.model_dump().items():
        setattr(driver, key, value)
    db.commit()
    db.refresh(driver)
    return driver
