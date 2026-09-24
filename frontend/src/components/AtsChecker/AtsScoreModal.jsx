import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  Zap,
  Briefcase,
  Search,
  Check,
  Tag
} from 'lucide-react';

export default function AtsScoreModal() {
  const {
    atsModalOpen,
    setAtsModalOpen,
    atsResult,
    atsLoading,
    triggerAtsAnalysis,
    jobDescriptionInput,
    setJobDescriptionInput
  } = useResume();

  const [jobText, setJobText] = useState(jobDescriptionInput || '');

  if (!atsModalOpen || !atsResult) return null;

  const score = atsResult.overallScore || 0;
  const breakdown = atsResult.breakdown || {};

  function getScoreColor(val) {
    if (val >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (val >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  }

  function handleScanAgainstJob() {
    setJobDescriptionInput(jobText);
    triggerAtsAnalysis(jobText);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">ATS Resume Optimization Report</h2>
              <p className="text-xs text-slate-500">
                Automated applicant tracking system compatibility &amp; content analysis.
              </p>
            </div>
          </div>
          <button
            onClick={() => setAtsModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Score Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
          {/* Main Score Radial */}
          <div className="flex flex-col items-center justify-center sm:border-r sm:border-slate-200 p-2">
            <div className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center ${getScoreColor(score)} shadow-inner`}>
              <span className="text-2xl font-black">{score}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">out of 100</span>
            </div>
            <div className="mt-2 text-xs font-bold text-slate-800">
              {score >= 85 ? 'Highly Competitive' : score >= 70 ? 'Strong Baseline' : 'Needs Polish'}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="sm:col-span-2 space-y-2">
            <div className="text-xs text-slate-700 font-medium leading-relaxed">
              {atsResult.summary}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <div>
                  <div className="text-xs font-bold text-slate-800">{atsResult.actionVerbCount}</div>
                  <div className="text-[10px] text-slate-500">Action Verbs Found</div>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <div>
                  <div className="text-xs font-bold text-slate-800">{atsResult.quantifiableMetricCount}</div>
                  <div className="text-[10px] text-slate-500">Quantifiable Metrics</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown Progress Bars */}
        <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs font-bold text-slate-800 mb-2">Category Score Breakdown</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-600 font-medium">Contact Details</span>
                <span className="font-bold text-slate-800">{breakdown.contactInfo || 0} / 20</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${((breakdown.contactInfo || 0) / 20) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-600 font-medium">Summary Impact</span>
                <span className="font-bold text-slate-800">{breakdown.summaryQuality || 0} / 20</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: `${((breakdown.summaryQuality || 0) / 20) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-600 font-medium">Experience & Metrics</span>
                <span className="font-bold text-slate-800">{breakdown.experienceImpact || 0} / 25</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${((breakdown.experienceImpact || 0) / 25) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-600 font-medium">Skills Inventory</span>
                <span className="font-bold text-slate-800">{breakdown.skillsRelevance || 0} / 20</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: `${((breakdown.skillsRelevance || 0) / 20) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-2">
            <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verified Strengths
            </div>
            <ul className="space-y-1.5 text-[11px] text-emerald-900">
              {atsResult.strengths?.map((str, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">&bull;</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-2">
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Actionable Recommendations
            </div>
            <ul className="space-y-1.5 text-[11px] text-amber-900">
              {atsResult.improvements?.length === 0 ? (
                <li className="text-slate-500 italic">No major issues identified!</li>
              ) : (
                atsResult.improvements?.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">&bull;</span>
                    <span>{imp}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Job Description Target Keyword Matcher */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-blue-600" />
              Target Job Description Matcher
            </div>
            <span className="text-[10px] text-slate-500">Paste job requirements from LinkedIn / Indeed</span>
          </div>

          <textarea
            rows={3}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Paste target job description requirements here to test keyword matching..."
            className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-500">
              {jobText ? `${jobText.split(/\s+/).filter(Boolean).length} words` : 'Empty'}
            </span>
            <button
              onClick={handleScanAgainstJob}
              disabled={atsLoading || !jobText.trim()}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              {atsLoading ? 'Scanning...' : 'Scan Keywords Match'}
            </button>
          </div>

          {/* Keywords Results */}
          {(atsResult.matchedKeywords?.length > 0 || atsResult.missingKeywords?.length > 0) && (
            <div className="pt-2 border-t border-slate-200 space-y-2">
              {atsResult.matchedKeywords?.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> Matched Keywords in Your CV:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {atsResult.matchedKeywords.map((kw) => (
                      <span key={kw} className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {atsResult.missingKeywords?.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-rose-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-rose-600" /> Missing Key Terms (Add to Skills/Experience):
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {atsResult.missingKeywords.map((kw) => (
                      <span key={kw} className="text-[10px] bg-rose-50 border border-rose-200 text-rose-700 px-2 py-0.5 rounded-full font-medium">
                        +{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setAtsModalOpen(false)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
