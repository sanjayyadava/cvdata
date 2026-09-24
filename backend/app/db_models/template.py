from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Template(Base):
    __tablename__ = "templates"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255), nullable=False, unique=True)
    description = Column(Text)

    preview_image = Column(String(500))
    template_key = Column(String(100), unique=True)

    is_active = Column(Integer, default=1)