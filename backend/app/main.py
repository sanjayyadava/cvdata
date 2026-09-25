from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.db_models import (
    User,
    CV,
    Skill,
    Experience,
    Education,
    Project,
    Certification,
    Language,
    Template,
    ATSReport,
)

from app.routers import cv


# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="CV Builder API",
    version="1.0.0",
)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register CV routes
app.include_router(cv.router)