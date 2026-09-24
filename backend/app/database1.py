import json
import os
import threading
from typing import List, Optional
from datetime import datetime
from app.models.cv import (
    CVDocument,
    PersonalInfo,
    ExperienceItem,
    EducationItem,
    SkillItem,
    ProjectItem,
    CertificationItem,
    CustomSection,
    CustomItem,
    ResumeMetadata
)

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
DATA_FILE = os.path.join(DATA_DIR, "resumes.json")
_lock = threading.Lock()

def get_default_sample_cv() -> CVDocument:
    return CVDocument(
        id="sample-alex-morgan",
        title="Alex Morgan - Senior Full Stack Engineer",
        personal=PersonalInfo(
            fullName="Alex Morgan",
            jobTitle="Senior Full Stack Engineer",
            email="alex.morgan@example.com",
            phone="+1 (555) 234-5678",
            location="San Francisco, CA",
            website="https://alexmorgan.dev",
            linkedin="https://linkedin.com/in/alexmorgan",
            github="https://github.com/alexmorgan",
            summary=(
                "Versatile Full Stack Engineer with 6+ years of experience architecting resilient cloud-native "
                "microservices and intuitive, high-performance web applications. Spearheaded transition to modern "
                "distributed APIs boosting transaction throughput by 42% and slashing cloud compute costs by 28%."
            )
        ),
        experiences=[
            ExperienceItem(
                id="exp-1",
                role="Senior Full Stack Engineer",
                company="TechCorp Solutions",
                location="San Francisco, CA",
                startDate="2022-03",
                endDate="",
                current=True,
                description=(
                    "• Architected and deployed event-driven data pipelines processing 10M+ daily events using Python FastAPI and Kafka.\n"
                    "• Redesigned core customer dashboard using React, Tailwind CSS, and Vite, reducing initial page load time by 48%.\n"
                    "• Spearheaded CI/CD automation pipeline using GitHub Actions, cutting release deployment cycles from 3 hours to 12 minutes.\n"
                    "• Mentored a team of 6 engineers across frontend and backend best practices, conducting bi-weekly architectural reviews."
                )
            ),
            ExperienceItem(
                id="exp-2",
                role="Software Engineer",
                company="CloudWave Inc.",
                location="Seattle, WA",
                startDate="2020-06",
                endDate="2022-02",
                current=False,
                description=(
                    "• Built and maintained RESTful and GraphQL APIs in Python for an enterprise inventory tracking platform.\n"
                    "• Implemented real-time status notifications using WebSockets and Redis Pub/Sub, boosting user engagement by 30%.\n"
                    "• Engineered automated test suites achieving 92% code coverage, resulting in a 40% decline in production bugs."
                )
            )
        ],
        education=[
            EducationItem(
                id="edu-1",
                degree="B.S. in Computer Science",
                institution="University of California, Berkeley",
                location="Berkeley, CA",
                startDate="2016-09",
                endDate="2020-05",
                current=False,
                gpa="3.85 / 4.0",
                description="Graduated with High Honors. Dean's Honor List (4 semesters). Capstone Project: Real-time distributed sensor aggregation."
            )
        ],
        skills=[
            SkillItem(id="sk-1", name="React & Next.js", level="Expert", category="Frontend"),
            SkillItem(id="sk-2", name="TypeScript & JavaScript", level="Expert", category="Frontend"),
            SkillItem(id="sk-3", name="Tailwind CSS", level="Expert", category="Frontend"),
            SkillItem(id="sk-4", name="Python & FastAPI", level="Expert", category="Backend"),
            SkillItem(id="sk-5", name="Node.js & Express", level="Advanced", category="Backend"),
            SkillItem(id="sk-6", name="PostgreSQL & Redis", level="Advanced", category="Database"),
            SkillItem(id="sk-7", name="Docker & Kubernetes", level="Advanced", category="DevOps"),
            SkillItem(id="sk-8", name="AWS (ECS, S3, RDS)", level="Intermediate", category="Cloud")
        ],
        projects=[
            ProjectItem(
                id="proj-1",
                title="Real-Time Collaborative Whiteboard",
                description="Multiplayer canvas app enabling simultaneous live sketching, sticky notes, and video sharing for remote teams.",
                technologies="React, WebSockets, FastAPI, Canvas API, Redis",
                link="https://canvas.alexmorgan.dev",
                github="https://github.com/alexmorgan/canvas"
            ),
            ProjectItem(
                id="proj-2",
                title="AI Query Assistant & Smart Docs",
                description="Intelligent search engine indexing large technical docs with vector embeddings and sub-second semantic retrieval.",
                technologies="Python, FastAPI, OpenAI API, Qdrant, React",
                link="https://askdocs.alexmorgan.dev",
                github="https://github.com/alexmorgan/smart-docs"
            )
        ],
        certifications=[
            CertificationItem(
                id="cert-1",
                name="AWS Certified Solutions Architect – Associate",
                issuer="Amazon Web Services",
                issueDate="2023-08",
                credentialUrl="https://aws.amazon.com/verify"
            ),
            CertificationItem(
                id="cert-2",
                name="Certified Kubernetes Application Developer (CKAD)",
                issuer="Cloud Native Computing Foundation",
                issueDate="2022-11",
                credentialUrl="https://www.cncf.io/certification/ckad"
            )
        ],
        customSections=[
            CustomSection(
                id="cust-1",
                title="Awards & Speaking",
                items=[
                    CustomItem(
                        id="citem-1",
                        title="PyCon Speaker - Async Scalability",
                        subtitle="Keynote Presentation",
                        date="2023",
                        description="Delivered presentation on building high-performance asynchronous microservices with FastAPI to 800+ attendees."
                    )
                ]
            )
        ],
        metadata=ResumeMetadata(
            template="modern",
            primaryColor="#2563eb",
            fontFamily="inter",
            fontSize="md",
            spacing="normal"
        )
    )

def _ensure_data_file():
    os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(DATA_FILE):
        default_cv = get_default_sample_cv()
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump([default_cv.model_dump()], f, indent=2)

def get_all_cvs() -> List[CVDocument]:
    with _lock:
        _ensure_data_file()
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                return [CVDocument.model_validate(item) for item in data]
        except Exception:
            return [get_default_sample_cv()]

def get_cv_by_id(cv_id: str) -> Optional[CVDocument]:
    cvs = get_all_cvs()
    for cv in cvs:
        if cv.id == cv_id:
            return cv
    return None

def save_cv(cv: CVDocument) -> CVDocument:
    with _lock:
        _ensure_data_file()
        cv.updatedAt = datetime.utcnow().isoformat()
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            data = []

        found = False
        new_data = []
        for item in data:
            if item.get("id") == cv.id:
                new_data.append(cv.model_dump())
                found = True
            else:
                new_data.append(item)

        if not found:
            new_data.append(cv.model_dump())

        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(new_data, f, indent=2)

        return cv

def delete_cv(cv_id: str) -> bool:
    with _lock:
        _ensure_data_file()
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            return False

        filtered = [item for item in data if item.get("id") != cv_id]
        if len(filtered) == len(data):
            return False

        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(filtered, f, indent=2)

        return True 
