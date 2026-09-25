from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.cv import CVDocument, CVResponse
from app.db_models.cv import CV


router = APIRouter(
    prefix="/cvs",
    tags=["CV"]
)


# ---------------------------------------------------------
# CREATE CV
# POST /cvs/
# ---------------------------------------------------------
@router.post(
    "/",
    response_model=CVResponse,
    status_code=status.HTTP_201_CREATED
)
def create_cv(
    cv_data: CVDocument,
    db: Session = Depends(get_db)
):
    try:
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

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )


# ---------------------------------------------------------
# GET ALL CVS
# GET /cvs/
# ---------------------------------------------------------
@router.get(
    "/",
    response_model=list[CVResponse]
)
def get_cvs(
    db: Session = Depends(get_db)
):
    try:
        cvs = (
            db.query(CV)
            .order_by(CV.id.desc())
            .all()
        )

        return cvs

    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )


# ---------------------------------------------------------
# GET SINGLE CV
# GET /cvs/{cv_id}
# ---------------------------------------------------------
@router.get(
    "/{cv_id}",
    response_model=CVResponse
)
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
            status_code=status.HTTP_404_NOT_FOUND,
            detail="CV not found"
        )

    return cv


# ---------------------------------------------------------
# UPDATE CV
# PUT /cvs/{cv_id}
# ---------------------------------------------------------
@router.put(
    "/{cv_id}",
    response_model=CVResponse
)
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
            status_code=status.HTTP_404_NOT_FOUND,
            detail="CV not found"
        )

    try:
        cv.title = cv_data.title
        cv.name = cv_data.name
        cv.email = cv_data.email
        cv.phone = cv_data.phone
        cv.summary = cv_data.summary
        cv.template_id = cv_data.template_id

        db.commit()
        db.refresh(cv)

        return cv

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )


# ---------------------------------------------------------
# DELETE CV
# DELETE /cvs/{cv_id}
# ---------------------------------------------------------
@router.delete(
    "/{cv_id}"
)
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
            status_code=status.HTTP_404_NOT_FOUND,
            detail="CV not found"
        )

    try:
        db.delete(cv)
        db.commit()

        return {
            "success": True,
            "message": "CV deleted successfully",
            "id": cv_id
        }

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )