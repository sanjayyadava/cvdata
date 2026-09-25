import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCVs,
  getCV,
  createCV,
  updateCV,
  deleteCV,
} from "../services/api";

const ResumeContext = createContext(null);

const DEFAULT_CV = {
  id: null,
  title: "My Resume",

  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
  },

  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],

  template: "modern",
};

export function ResumeProvider({ children }) {
  const [cv, setCv] = useState({
    ...DEFAULT_CV,
    personalInfo: {
      ...DEFAULT_CV.personalInfo,
    },
  });

  const [activeTab, setActiveTab] = useState("contact");
  const [zoomLevel, setZoomLevel] = useState(100);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [savedCVs, setSavedCVs] = useState([]);

  const [atsLoading, setAtsLoading] = useState(false);
  const [atsResult, setAtsResult] = useState(null);

  useEffect(() => {
    loadSavedCVs();
  }, []);

  async function loadSavedCVs() {
    try {
      const data = await getCVs();

      if (Array.isArray(data)) {
        setSavedCVs(data);
      } else {
        setSavedCVs([]);
      }
    } catch (err) {
      console.error("Failed to load CVs:", err);
      setSavedCVs([]);
      setError(err.message);
    }
  }

  function normalizeCV(data) {
    if (!data) {
      return {
        ...DEFAULT_CV,
        personalInfo: {
          ...DEFAULT_CV.personalInfo,
        },
      };
    }

    return {
      ...DEFAULT_CV,
      ...data,

      personalInfo: {
        ...DEFAULT_CV.personalInfo,
        ...(data.personalInfo || {}),
      },

      experience: Array.isArray(data.experience)
        ? data.experience
        : [],

      education: Array.isArray(data.education)
        ? data.education
        : [],

      skills: Array.isArray(data.skills)
        ? data.skills
        : [],

      projects: Array.isArray(data.projects)
        ? data.projects
        : [],

      certifications: Array.isArray(data.certifications)
        ? data.certifications
        : [],

      languages: Array.isArray(data.languages)
        ? data.languages
        : [],
    };
  }

  async function loadCV(cvId) {
    try {
      setLoading(true);
      setError(null);

      const data = await getCV(cvId);

      const normalized = normalizeCV(data);

      setCv(normalized);

      return normalized;
    } catch (err) {
      console.error("Failed to load CV:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function handleLoadCV(cvId) {
    try {
      await loadCV(cvId);
      return true;
    } catch (err) {
      alert(`Unable to load CV: ${err.message}`);
      return false;
    }
  }

  async function handleSaveCV() {
    try {
      setIsSaving(true);
      setSaveSuccess(false);
      setError(null);

      let data;

      if (cv?.id) {
        data = await updateCV(cv.id, cv);
      } else {
        data = await createCV(cv);
      }

      const normalized = normalizeCV(data);

      setCv(normalized);
      setSaveSuccess(true);

      await loadSavedCVs();

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

      return normalized;
    } catch (err) {
      console.error("Failed to save CV:", err);

      setError(err.message);

      alert(`Unable to save CV: ${err.message}`);

      throw err;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteSavedCV(cvId) {
    try {
      await deleteCV(cvId);

      await loadSavedCVs();

      if (cv?.id === cvId) {
        resetCV();
      }

      return true;
    } catch (err) {
      console.error("Failed to delete CV:", err);

      alert(`Unable to delete CV: ${err.message}`);

      return false;
    }
  }

  function updateResume(field, value) {
    setCv((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

function updatePersonal(field, value) {
  setCv((previous) => ({
    ...previous,
    personalInfo: {
      ...(previous.personalInfo || {}),
      [field]: value,
    },
  }));
}
  function resetCV() {
    setCv({
      ...DEFAULT_CV,

      personalInfo: {
        ...DEFAULT_CV.personalInfo,
      },
    });

    setActiveTab("contact");
    setZoomLevel(100);
    setAtsResult(null);
    setError(null);
  }

  function loadSampleData() {
    const sampleCV = {
      ...DEFAULT_CV,

      personalInfo: {
        fullName: "Sanjay Kumar",
        jobTitle: "Python / FastAPI Developer",
        email: "sanjay@example.com",
        phone: "+91 98765 43210",
        location: "New Delhi, India",
        website: "https://example.com",
        linkedin: "linkedin.com/in/sanjaykumar",
        github: "github.com/sanjaykumar",

        summary:
          "Python developer with experience building modern web applications using Python, FastAPI, React and SQL.",
      },

      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],

      template: "modern",
    };

    setCv(normalizeCV(sampleCV));
  }

  async function triggerAtsAnalysis() {
    try {
      setAtsLoading(true);

      const personal = cv.personalInfo || {};

      let score = 0;

      if (personal.fullName) score += 15;
      if (personal.jobTitle) score += 10;
      if (personal.email) score += 10;
      if (personal.phone) score += 10;
      if (personal.summary) score += 10;

      if (cv.experience?.length) score += 15;
      if (cv.education?.length) score += 10;
      if (cv.skills?.length) score += 10;
      if (cv.projects?.length) score += 10;

      const result = {
        score,
        percentage: score,
        message:
          score >= 80
            ? "Your CV contains most important sections."
            : "Add more information to improve your ATS score.",
      };

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      setAtsResult(result);

      return result;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return null;
    } finally {
      setAtsLoading(false);
    }
  }

  function exportJson() {
    const json = JSON.stringify(cv, null, 2);

    const blob = new Blob(
      [json],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      `${cv.title || "resume"}-backup.json`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  }

  function importJson(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        setCv(normalizeCV(data));
      } catch {
        alert("Invalid JSON file.");
      }
    };

    reader.readAsText(file);

    event.target.value = "";
  }

  const contextValue = {
    cv,
    setCv,

    resume: cv,
    setResume: setCv,

    activeTab,
    setActiveTab,

    zoomLevel,
    setZoomLevel,

    updateResume,
        
    updatePersonal,

    cvId: cv?.id || null,

    loading,
    error,

    isSaving,
    saveSuccess,

    savedCVs,

    loadCV,
    handleLoadCV,
    handleSaveCV,
    handleDeleteSavedCV,

    loadSampleData,
    resetCV,

    triggerAtsAnalysis,
    atsLoading,
    atsResult,
    updatePersonal,

    exportJson,
    importJson,
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error(
      "useResume must be used inside ResumeProvider"
    );
  }

  return context;
}