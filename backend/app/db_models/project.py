from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    cv_id = Column(
        Integer,
        ForeignKey("cvs.id", ondelete="CASCADE"),
        nullable=False
    )

    name = Column(String(255), nullable=False)
    description = Column(Text)

    technologies = Column(Text)
    project_url = Column(String(500))