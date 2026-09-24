from datetime import datetime

from sqlalchemy import (
    String,
    Text,
    DateTime,
    Boolean,
    ForeignKey,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.database import Base


# =========================================================
# USER
# =========================================================

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(150),
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    cvs: Mapped[list["CV"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )


# =========================================================
# CV
# =========================================================

class CV(Base):
    __tablename__ = "cvs"

    id: Mapped[str] = mapped_column(
        String(100),
        primary_key=True,
        index=True,
    )

    user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
        nullable=True,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        default="Untitled CV",
    )

    full_name: Mapped[str] = mapped_column(
        String(150),
        default="",
    )

    job_title: Mapped[str] = mapped_column(
        String(200),
        default="",
    )

    email: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    phone: Mapped[str] = mapped_column(
        String(100),
        default="",
    )

    location: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    website: Mapped[str] = mapped_column(
        String(500),
        default="",
    )

    linkedin: Mapped[str] = mapped_column(
        String(500),
        default="",
    )

    github: Mapped[str] = mapped_column(
        String(500),
        default="",
    )

    summary: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    # Relationships

    user: Mapped["User | None"] = relationship(
        back_populates="cvs",
    )

    experiences: Mapped[list["Experience"]] = relationship(
        back_populates="cv",
        cascade="all, delete-orphan",
    )

    educations: Mapped[list["Education"]] = relationship(
        back_populates="cv",
        cascade="all, delete-orphan",
    )

    skills: Mapped[list["Skill"]] = relationship(
        back_populates="cv",
        cascade="all, delete-orphan",
    )

    projects: Mapped[list["Project"]] = relationship(
        back_populates="cv",
        cascade="all, delete-orphan",
    )

    certifications: Mapped[list["Certification"]] = relationship(
        back_populates="cv",
        cascade="all, delete-orphan",
    )

    custom_sections: Mapped[list["CustomSection"]] = relationship(
        back_populates="cv",
        cascade="all, delete-orphan",
    )

    metadata: Mapped["ResumeMetadata | None"] = relationship(
        back_populates="cv",
        cascade="all, delete-orphan",
        uselist=False,
    )


# =========================================================
# EXPERIENCE
# =========================================================

class Experience(Base):
    __tablename__ = "experiences"

    id: Mapped[str] = mapped_column(
        String(100),
        primary_key=True,
    )

    cv_id: Mapped[str] = mapped_column(
        ForeignKey("cvs.id"),
        index=True,
    )

    role: Mapped[str] = mapped_column(
        String(200),
        default="",
    )

    company: Mapped[str] = mapped_column(
        String(200),
        default="",
    )

    location: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    start_date: Mapped[str] = mapped_column(
        String(50),
        default="",
    )

    end_date: Mapped[str] = mapped_column(
        String(50),
        default="",
    )

    current: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    cv: Mapped["CV"] = relationship(
        back_populates="experiences",
    )


# =========================================================
# EDUCATION
# =========================================================

class Education(Base):
    __tablename__ = "educations"

    id: Mapped[str] = mapped_column(
        String(100),
        primary_key=True,
    )

    cv_id: Mapped[str] = mapped_column(
        ForeignKey("cvs.id"),
        index=True,
    )

    degree: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    institution: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    location: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    start_date: Mapped[str] = mapped_column(
        String(50),
        default="",
    )

    end_date: Mapped[str] = mapped_column(
        String(50),
        default="",
    )

    current: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    gpa: Mapped[str] = mapped_column(
        String(50),
        default="",
    )

    description: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    cv: Mapped["CV"] = relationship(
        back_populates="educations",
    )


# =========================================================
# SKILL
# =========================================================

class Skill(Base):
    __tablename__ = "skills"

    id: Mapped[str] = mapped_column(
        String(100),
        primary_key=True,
    )

    cv_id: Mapped[str] = mapped_column(
        ForeignKey("cvs.id"),
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        default="",
    )

    level: Mapped[str] = mapped_column(
        String(100),
        default="",
    )

    category: Mapped[str] = mapped_column(
        String(100),
        default="",
    )

    cv: Mapped["CV"] = relationship(
        back_populates="skills",
    )


# =========================================================
# PROJECT
# =========================================================

class Project(Base):
    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(
        String(100),
        primary_key=True,
    )

    cv_id: Mapped[str] = mapped_column(
        ForeignKey("cvs.id"),
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    description: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    technologies: Mapped[str] = mapped_column(
        String(1000),
        default="",
    )

    link: Mapped[str] = mapped_column(
        String(500),
        default="",
    )

    github: Mapped[str] = mapped_column(
        String(500),
        default="",
    )

    cv: Mapped["CV"] = relationship(
        back_populates="projects",
    )


# =========================================================
# CERTIFICATION
# =========================================================

class Certification(Base):
    __tablename__ = "certifications"

    id: Mapped[str] = mapped_column(
        String(100),
        primary_key=True,
    )

    cv_id: Mapped[str] = mapped_column(
        ForeignKey("cvs.id"),
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    issuer: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    issue_date: Mapped[str] = mapped_column(
        String(50),
        default="",
    )

    credential_url: Mapped[str] = mapped_column(
        String(500),
        default="",
    )

    cv: Mapped["CV"] = relationship(
        back_populates="certifications",
    )


# =========================================================
# CUSTOM SECTION
# =========================================================

class CustomSection(Base):
    __tablename__ = "custom_sections"

    id: Mapped[str] = mapped_column(
        String(100),
        primary_key=True,
    )

    cv_id: Mapped[str] = mapped_column(
        ForeignKey("cvs.id"),
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    cv: Mapped["CV"] = relationship(
        back_populates="custom_sections",
    )

    items: Mapped[list["CustomItem"]] = relationship(
        back_populates="section",
        cascade="all, delete-orphan",
    )


# =========================================================
# CUSTOM ITEM
# =========================================================

class CustomItem(Base):
    __tablename__ = "custom_items"

    id: Mapped[str] = mapped_column(
        String(100),
        primary_key=True,
    )

    section_id: Mapped[str] = mapped_column(
        ForeignKey("custom_sections.id"),
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    subtitle: Mapped[str] = mapped_column(
        String(255),
        default="",
    )

    date: Mapped[str] = mapped_column(
        String(100),
        default="",
    )

    description: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    section: Mapped["CustomSection"] = relationship(
        back_populates="items",
    )


# =========================================================
# RESUME METADATA
# =========================================================

class ResumeMetadata(Base):
    __tablename__ = "resume_metadata"

    id: Mapped[int] = mapped_column(
        primary_key=True,
    )

    cv_id: Mapped[str] = mapped_column(
        ForeignKey("cvs.id"),
        unique=True,
        index=True,
    )

    template: Mapped[str] = mapped_column(
        String(100),
        default="modern",
    )

    primary_color: Mapped[str] = mapped_column(
        String(50),
        default="#2563eb",
    )

    font_family: Mapped[str] = mapped_column(
        String(100),
        default="inter",
    )

    font_size: Mapped[str] = mapped_column(
        String(50),
        default="md",
    )

    spacing: Mapped[str] = mapped_column(
        String(50),
        default="normal",
    )

    cv: Mapped["CV"] = relationship(
        back_populates="metadata",
    )

