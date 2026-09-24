cv-builder/
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI app, CORS middleware & routes
│   │   ├── database.py           # Persistent JSON file storage & sample seeder
│   │   ├── models/cv.py          # Pydantic schemas (CVDocument, ATS, Templates)
│   │   ├── routers/
│   │   │   ├── cv.py             # CRUD & ReportLab PDF endpoints
│   │   │   ├── ats.py            # ATS analyzer endpoint
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
│   ├── tailwind.config.js
│   └── src/
│       ├── main.jsx              # React DOM entry
│       ├── App.jsx               # Split-pane layout coordinator
│       ├── index.css             # Tailwind & @media print styles
│       ├── context/ResumeContext.jsx # Central state management & API hooks
│       ├── services/api.js       # Frontend REST client
│       ├── components/
│       │   ├── Navbar.jsx        # Top action bar (Save, Export, ATS modal)
│       │   ├── TemplateSelector.jsx # Visual design and theme picker
│       │   ├── FormEditor/       # Contact, Experience, Education, Skills, Projects...
│       │   ├── Preview/          # Live Paper Preview & 4 Templates
│       │   └── AtsChecker/       # ATS Score & Keyword Match Modal
│       └── utils/
│           ├── sampleData.js
│           └── exportPdf.js
├── start.sh                      # 1-command startup script
└── README.md