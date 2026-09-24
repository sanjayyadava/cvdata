from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)

    cv_id = Column(
        Integer,
        ForeignKey("cvs.id", ondelete="CASCADE"),
        nullable=False
    )

    name = Column(String(255), nullable=False)
    issuing_organization = Column(String(255))

    issue_date = Column(String(50))
    expiry_date = Column(String(50))

    credential_id = Column(String(255))