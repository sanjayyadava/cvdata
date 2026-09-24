from fastapi import APIRouter
from app.models.cv import ATSAnalysisRequest, ATSAnalysisResponse
from app.services.ats_service import analyze_cv_ats

router = APIRouter(prefix="/api/ats", tags=["ATS Optimization"])

@router.post("/analyze", response_model=ATSAnalysisResponse)
def analyze_resume_ats(request: ATSAnalysisRequest):
    """Analyze CV for ATS compliance, action verbs, metrics, and match against optional Job Description."""
    return analyze_cv_ats(request.cv, request.jobDescription or "")
