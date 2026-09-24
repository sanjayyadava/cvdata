from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/api/templates", tags=["CV Templates"])

TEMPLATES = [
    {
        "id": "modern",
        "name": "Modern Tech",
        "badge": "Popular",
        "description": "Clean split header with high-contrast accent lines, prominent skills matrix, and clear metric bullets.",
        "bestFor": "Software Engineers, Product Managers, Data Scientists",
        "defaultColor": "#2563eb",
        "features": ["Accent Divider", "Categorized Skills", "Direct Link Icons", "ATS-Friendly Single Column"]
    },
    {
        "id": "executive",
        "name": "Executive Slate",
        "badge": "Leadership",
        "description": "Sophisticated serif typography with elegant border styling, highlighting leadership impact and summary.",
        "bestFor": "Engineering Managers, Directors, Consultants, C-Suite",
        "defaultColor": "#0f766e",
        "features": ["Classy Serif Headers", "Impact Highlights", "Prominent Summary", "Clean Timelines"]
    },
    {
        "id": "minimal",
        "name": "Clean Minimalist",
        "badge": "ATS Optimized",
        "description": "Ultra-clean Scandinavian minimalist design prioritizing maximum readability and strict ATS compliance.",
        "bestFor": "All professions, Finance, Law, Academia",
        "defaultColor": "#18181b",
        "features": ["Zero Clutter", "100% Parseable", "Monochrome Accents", "Compact Density"]
    },
    {
        "id": "tech",
        "name": "Dev & Code",
        "badge": "Developer Focus",
        "description": "Tech-centric layout with code-font badge accents, repo link tags, and stack breakdown.",
        "bestFor": "Full Stack Devs, DevOps, Cloud Architects, Open Source Contributors",
        "defaultColor": "#7c3aed",
        "features": ["Tech Stack Badges", "Git Repo Highlights", "Terminal-style Accents", "Skills Matrix"]
    }
]

COLOR_PRESETS = [
    {"name": "Ocean Blue", "hex": "#2563eb"},
    {"name": "Teal Slate", "hex": "#0f766e"},
    {"name": "Royal Violet", "hex": "#7c3aed"},
    {"name": "Emerald Green", "hex": "#059669"},
    {"name": "Crimson Ruby", "hex": "#dc2626"},
    {"name": "Charcoal Black", "hex": "#1e293b"},
    {"name": "Warm Amber", "hex": "#d97706"}
]

@router.get("")
def get_templates() -> Dict[str, Any]:
    """Returns available CV design templates and color presets."""
    return {
        "templates": TEMPLATES,
        "colorPresets": COLOR_PRESETS,
        "fontOptions": [
            {"id": "inter", "name": "Inter (Modern Sans)"},
            {"id": "roboto", "name": "Roboto (Clean Tech)"},
            {"id": "merriweather", "name": "Merriweather (Classic Serif)"},
            {"id": "playfair", "name": "Playfair Display (Executive Editorial)"}
        ]
    }
