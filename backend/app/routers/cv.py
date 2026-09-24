from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.cv import CVDocument, CVResponse
from app.db_models.cv import CV


router = APIRouter(
    prefix="/cvs",
    tags=["CV"]
)


@router.post("/", response_model=CVResponse)
def create_cv(
    cv_data: CVDocument,
    db: Session = Depends(get_db)
):
    cv = CV(
        title=cv_data.title,
        name=cv_data.name,
        email=cv_data.email,
        phone=cv_data.phone,
        summary=cv_data.summary,
        template_id=cv_data.template_id,
    )

    db.add(cv)
    db.commit()
    db.refresh(cv)

    return cv


@router.get("/", response_model=list[CVResponse])
def get_cvs(
    db: Session = Depends(get_db)
):
    return db.query(CV).all()


@router.get("/{cv_id}", response_model=CVResponse)
def get_cv(
    cv_id: int,
    db: Session = Depends(get_db)
):
    cv = (
        db.query(CV)
        .filter(CV.id == cv_id)
        .first()
    )

    if not cv:
        raise HTTPException(
            status_code=404,
            detail="CV not found"
        )

    return cv


@router.put("/{cv_id}", response_model=CVResponse)
def update_cv(
    cv_id: int,
    cv_data: CVDocument,
    db: Session = Depends(get_db)
):
    cv = (
        db.query(CV)
        .filter(CV.id == cv_id)
        .first()
    )

    if not cv:
        raise HTTPException(
            status_code=404,
            detail="CV not found"
        )

    cv.title = cv_data.title
    cv.name = cv_data.name
    cv.email = cv_data.email
    cv.phone = cv_data.phone
    cv.summary = cv_data.summary
    cv.template_id = cv_data.template_id

    db.commit()
    db.refresh(cv)

    return cv


@router.delete("/{cv_id}")
def delete_cv(
    cv_id: int,
    db: Session = Depends(get_db)
):
    cv = (
        db.query(CV)
        .filter(CV.id == cv_id)
        .first()
    )

    if not cv:
        raise HTTPException(
            status_code=404,
            detail="CV not found"
        )

    db.delete(cv)
    db.commit()

    return {
        "message": "CV deleted successfully"
    }