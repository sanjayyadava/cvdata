from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.db_models.cv import CV
from app.routers import cv
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
    ATSReport
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CV Builder API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cv.router)