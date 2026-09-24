from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)

    cv_id = Column(
        Integer,
        ForeignKey("cvs.id", ondelete="CASCADE"),
        nullable=False
    )

    skill_name = Column(String(255), nullable=False)
    skill_level = Column(String(50))