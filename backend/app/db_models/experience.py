from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database import Base


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)

    cv_id = Column(
        Integer,
        ForeignKey("cvs.id", ondelete="CASCADE"),
        nullable=False
    )

    company = Column(String(255), nullable=False)
    position = Column(String(255), nullable=False)

    start_date = Column(String(50))
    end_date = Column(String(50))

    description = Column(Text)

    location = Column(String(255))