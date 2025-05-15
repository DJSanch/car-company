from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Get DATABASE_URL from environment (e.g., Render secret or .env)
DATABASE_URL = os.getenv("DATABASE_URL")

# Raise an error if DATABASE_URL is not found
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Please check your .env or Render secrets.")

# Connect using SQLAlchemy engine
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Create a Session class bound to the engine
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declare a base class for models
Base = declarative_base()
