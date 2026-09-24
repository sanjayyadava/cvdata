from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)

    cv_id = Column(
        Integer,
        ForeignKey("cvs.id", ondelete="CASCADE"),
        nullable=False
    )

    institution = Column(String(255), nullable=False)
    degree = Column(String(255))
    field_of_study = Column(String(255))

    start_date = Column(String(50))
    end_date = Column(String(50))

    grade = Column(String(100))