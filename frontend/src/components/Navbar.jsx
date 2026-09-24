import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { downloadBackendPDF } from '../services/api';
import { printResume } from '../utils/exportPdf';
import {
  FileText,
  Save,
  CheckCircle,
  Download,
  Printer,
  Sparkles,
  Upload,
  FolderOpen,
  Plus,
  Trash2,
  Palette,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ onOpenTemplates }) {
  const {
    cv,
    setCv,
    handleSaveCV,
    isSaving,
    saveSuccess,
    savedCVs,
    handleLoadCV,
    handleDeleteSavedCV,
    loadSampleData,
    resetCV,
    triggerAtsAnalysis,
    atsLoading,
    atsResult,
    exportJson,
    importJson
  } = useResume();

  const [savedDropdownOpen, setSavedDropdownOpen] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  async function handleDownloadBackend() {
    setDownloadingPdf(true);
    try {
      await downloadBackendPDF(cv.id);
    } catch (err) {
      alert("Error generating PDF: " + err.message);
    } finally {
      setDownloadingPdf(false);
      setExportDropdownOpen(false);
    }
  }

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Document Name */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg hidden sm:inline">
                ProCV<span className="text-blue-600"></span>
              </span>
             
            </div>
            <input
              type="text"
              value={cv.title || ''}
              onChange={(e) => setCv(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Resume Title..."
              className="text-xs text-slate-500 hover:text-slate-800 focus:text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none px-0 py-0.5 w-44 sm:w-60 truncate transition-colors"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Design & Theme Button */}
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Choose template & color styling"
          >
            <Palette className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline">Design & Templates</span>
          </button>

          {/* ATS Analyzer Trigger */}
          <button
            onClick={() => triggerAtsAnalysis()}
            disabled={atsLoading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg shadow-sm transition-all hover:shadow active:scale-95 disabled:opacity-50"
            title="Scan resume for ATS compatibility"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span className="hidden sm:inline">ATS Score</span>
            {atsResult && (
              <span className="bg-emerald-800/60 text-emerald-100 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {atsResult.overallScore}%
              </span>
            )}
          </button>

          {/* Saved CVs Manager Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSavedDropdownOpen(!savedDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <FolderOpen className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Resumes</span>
              <span className="text-[10px] bg-slate-300 text-slate-700 px-1.5 py-0.2 rounded-full">
                {savedCVs.length}
              </span>
            </button>

            {savedDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-2">
                  <span className="text-xs font-bold text-slate-700">Saved Resumes</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => { resetCV(); setSavedDropdownOpen(false); }}
                      className="p-1 text-slate-400 hover:text-blue-600 rounded"
                      title="New Blank Resume"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { loadSampleData(); setSavedDropdownOpen(false); }}
                      className="text-[10px] text-blue-600 hover:underline px-1 py-0.5"
                    >
                      Load Sample
                    </button>
                  </div>
                </div>

                <div className="max-h-56 overflow-y-auto space-y-1">
                  {savedCVs.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">No saved resumes yet.</p>
                  ) : (
                    savedCVs.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-2 rounded-lg text-xs hover:bg-slate-50 transition-colors ${
                          item.id === cv.id ? 'bg-blue-50/70 border border-blue-200' : ''
                        }`}
                      >
                        <button
                          onClick={() => { handleLoadCV(item.id); setSavedDropdownOpen(false); }}
                          className="flex-1 text-left font-medium text-slate-700 truncate pr-2 hover:text-blue-600"
                        >
                          {item.title || item.personal?.fullName || 'Untitled'}
                          <div className="text-[10px] text-slate-400 font-normal">
                            Updated: {new Date(item.updatedAt || Date.now()).toLocaleDateString()}
                          </div>
                        </button>
                        <button
                          onClick={() => handleDeleteSavedCV(item.id)}
                          className="text-slate-300 hover:text-red-500 p-1"
                          title="Delete CV"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Save to Backend Button */}
          <button
            onClick={handleSaveCV}
            disabled={isSaving}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
              saveSuccess
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
            }`}
          >
            {saveSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
              </>
            )}
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>

            {exportDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                  Export Options
                </div>

                <button
                  onClick={handleDownloadBackend}
                  disabled={downloadingPdf}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-semibold">FastAPI Vector PDF</div>
                    <div className="text-[10px] text-slate-400">Server-rendered ReportLab document</div>
                  </div>
                </button>

                <button
                  onClick={() => { printResume(); setExportDropdownOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                >
                  <Printer className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="font-semibold">Browser Print / Save PDF</div>
                    <div className="text-[10px] text-slate-400">Exact pixel preview via browser engine</div>
                  </div>
                </button>

                <div className="border-t border-slate-100 my-1"></div>

                <button
                  onClick={() => { exportJson(); setExportDropdownOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <span>Download JSON Backup</span>
                </button>

                <label className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span>Restore from JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => { importJson(e); setExportDropdownOpen(false); }}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
