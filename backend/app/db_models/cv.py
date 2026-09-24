from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database import Base


class CV(Base):
    __tablename__ = "cvs"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    title = Column(String(255), nullable=False)

    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50))

    summary = Column(Text)

    template_id = Column(
        Integer,
        ForeignKey("templates.id"),
        nullable=True
    )