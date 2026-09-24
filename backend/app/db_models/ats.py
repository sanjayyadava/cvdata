from sqlalchemy import Column, Integer, Text, Float, ForeignKey
from app.database import Base


class ATSReport(Base):
    __tablename__ = "ats_reports"

    id = Column(Integer, primary_key=True, index=True)

    cv_id = Column(
        Integer,
        ForeignKey("cvs.id", ondelete="CASCADE"),
        nullable=False
    )

    job_description = Column(Text)

    score = Column(Float)

    matched_keywords = Column(Text)
    missing_keywords = Column(Text)

    recommendations = Column(Text)