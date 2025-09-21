from sqlalchemy import create_engine, Column, Integer, String, Float, MetaData, Table
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
metadata = MetaData()

anomalies = Table(
    "anomalies",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("timestamp", String),
    Column("metric", String),
    Column("value", Float),
    Column("explanation", String),
)

metadata.create_all(engine)
