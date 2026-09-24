# ProCV Builder — Modern Full-Stack CV & Resume Architect

A modern, full-featured CV and Resume Builder built with **Python FastAPI** backend and **React (Vite + Tailwind CSS)** frontend.

![ProCV Builder Architecture](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20TailwindCSS-blue)
![Backend](https://img.shields.io/badge/Backend-Python%20FastAPI%20%7C%20ReportLab-green)
![ATS Compatibility](https://img.shields.io/badge/ATS-Keyword%20Matcher%20%26%20Score-purple)

---

## ✨ Features

- **⚡ Real-Time Live Preview**: Dynamic dual-pane editor and canvas with instant visual feedback, zoom controls (50%–150%), and A4/Letter print framing.
- **🎨 4 Professional Templates**:
  - **Modern Tech**: Crisp accent divider, categorized skill badges, and direct portfolio/repo badges.
  - **Executive Slate**: Prestigious corporate serif typography with executive summaries and double border rules.
  - **Clean Minimalist**: 100% ATS-optimized single-column layout prioritizing maximum readability and parser compliance.
  - **Dev & Code**: Developer-first layout featuring terminal accents, code tags, and git indicators.
- **📄 Dual PDF Export Engine**:
  - **FastAPI Vector PDF**: Server-side vector PDF generation using Python ReportLab with exact point typography and layout fidelity.
  - **Browser Print Engine**: Pixel-perfect native browser PDF export using customized `@media print` rules.
- **🤖 ATS Optimization & Keyword Matcher**:
  - Scores your resume out of 100 across 5 key dimensions: Contact Details, Summary Quality, Experience Impact, Skills Inventory, and Formatting.
  - Action-verb scanner (identifies 90+ industry power verbs).
  - Quantifiable metrics detector (measures %, $, scale, and time savings).
  - Target Job Description Matcher: Paste any LinkedIn/Indeed job posting to extract and verify matched vs. missing keywords.
- **💾 Full Persistence & Multi-Resume Management**:
  - Save, update, and manage multiple resumes on the FastAPI backend.
  - Automatic LocalStorage caching for zero data loss on page refresh.
  - 1-click JSON backup export and restore.
  - Preloaded with high-impact software engineering sample data.

---

## 🏗️ Project Architecture

```
cv-builder/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py               # FastAPI app, CORS, routes
│   │   ├── database.py           # Persistent JSON file storage & sample seeder
│   │   ├── models/
│   │   │   └── cv.py             # Pydantic schemas (CVDocument, ATS, Templates)
│   │   ├── routers/
│   │   │   ├── cv.py             # CRUD & ReportLab PDF export endpoints
│   │   │   ├── ats.py            # ATS scoring and keyword analysis endpoint
│   │   │   └── templates.py      # Template presets and metadata
│   │   └── services/
│   │       ├── pdf_service.py    # ReportLab PDF vector generation engine
│   │       └── ats_service.py    # ATS scoring, power verbs, and keyword matcher
│   ├── requirements.txt
│   ├── run.py                    # Uvicorn runner
│   └── venv/                     # Python virtual environment
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js            # Vite config with backend API proxy
│   ├── tailwind.config.js        # Typography & layout configuration
│   └── src/
│       ├── main.jsx              # React DOM entry
│       ├── App.jsx               # Split-pane layout coordinator
│       ├── index.css             # Tailwind & @media print styles
│       ├── context/
│       │   └── ResumeContext.jsx # Central state management & API hooks
│       ├── services/
│       │   └── api.js            # Frontend REST client
│       ├── components/
│       │   ├── Navbar.jsx        # Actions, save status, export, ATS modal trigger
│       │   ├── TemplateSelector.jsx # Visual design and theme picker
│       │   ├── FormEditor/       # Multi-tab modular editor
│       │   │   ├── SectionManager.jsx
│       │   │   ├── PersonalInfo.jsx
│       │   │   ├── Experience.jsx
│       │   │   ├── Education.jsx
│       │   │   ├── Skills.jsx
│       │   │   ├── Projects.jsx
│       │   │   ├── Certifications.jsx
│       │   │   └── CustomSection.jsx
│       │   ├── Preview/
│       │   │   ├── ResumePreview.jsx
│       │   │   └── templates/    # 4 distinct visual templates
│       │   └── AtsChecker/
│       │       └── AtsScoreModal.jsx
│       └── utils/
│           ├── sampleData.js
│           └── exportPdf.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Start the FastAPI Backend

Open a terminal and run:

```bash
cd backend
# Using the pre-configured virtual environment:
./venv/bin/python run.py
```

The API will start at:
- **API URL**: [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check**: [http://localhost:8000/api/health](http://localhost:8000/api/health)

### 2. Start the React Frontend

In a second terminal, run:

```bash
cd frontend
npm run dev
```

The frontend will start at:
- **Web App**: [http://localhost:5173](http://localhost:5173)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/cv` | List all saved resumes |
| `GET` | `/api/cv/{id}` | Get specific resume by ID |
| `POST` | `/api/cv` | Save or update resume |
| `DELETE` | `/api/cv/{id}` | Delete a resume |
| `POST` | `/api/cv/export-pdf` | Stream server-side ReportLab PDF |
| `POST` | `/api/ats/analyze` | Analyze CV for ATS score & match against job description |
| `GET` | `/api/templates` | List design templates, fonts, and color palettes |
