from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class Language(Base):
    __tablename__ = "languages"

    id = Column(Integer, primary_key=True, index=True)

    cv_id = Column(
        Integer,
        ForeignKey("cvs.id", ondelete="CASCADE"),
        nullable=False
    )

    language = Column(String(100), nullable=False)
    proficiency = Column(String(100))