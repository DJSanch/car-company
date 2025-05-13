# In backend/app/models/driver.py
from sqlalchemy import Column, Integer, String
from app.database import Base

class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    contact = Column(String)
    status = Column(String)
