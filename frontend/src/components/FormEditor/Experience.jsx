import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Briefcase, Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Calendar, MapPin, Building } from 'lucide-react';

const SUGGESTED_VERBS = [
  "Architected", "Spearheaded", "Engineered", "Optimized", "Automated",
  "Scaled", "Delivered", "Mentored", "Reduced", "Integrated"
];

export default function Experience() {
  const { cv, addItem, updateItem, deleteItem } = useResume();
  const experiences = cv.experiences || [];
  const [expandedId, setExpandedId] = useState(experiences[0]?.id || null);

  function handleAddExperience() {
    const newId = `exp-${Date.now()}`;
    addItem('experiences', {
      id: newId,
      role: 'Software Engineer',
      company: 'Company Name',
      location: 'City, State',
      startDate: '2023-01',
      endDate: '',
      current: true,
      description: '• Implemented core customer-facing features using modern tech stack.\n• Collaborated with cross-functional product and engineering teams.'
    });
    setExpandedId(newId);
  }

  function insertVerb(expId, currentDesc, verb) {
    const updated = currentDesc ? `${currentDesc}\n• ${verb} ` : `• ${verb} `;
    updateItem('experiences', expId, 'description', updated);
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Work Experience
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Focus on accomplishments, metrics, and measurable business outcomes.
          </p>
        </div>
        <button
          onClick={handleAddExperience}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-600">No work experience added yet.</p>
          <button
            onClick={handleAddExperience}
            className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
          >
            + Add your first work experience
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm transition-all"
              >
                {/* Header Bar */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="p-3.5 flex items-center justify-between cursor-pointer bg-slate-50/70 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-xs text-slate-800 truncate">
                        {exp.role || 'Position Title'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {exp.company || 'Company'} &bull; {exp.startDate || 'Start'} – {exp.current ? 'Present' : exp.endDate || 'End'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItem('experiences', exp.id);
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove Position"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details Form */}
                {isExpanded && (
                  <div className="p-4 space-y-4 border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Job Title / Role *
                        </label>
                        <input
                          type="text"
                          value={exp.role || ''}
                          onChange={(e) => updateItem('experiences', exp.id, 'role', e.target.value)}
                          placeholder="e.g. Senior Software Engineer"
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          value={exp.company || ''}
                          onChange={(e) => updateItem('experiences', exp.id, 'company', e.target.value)}
                          placeholder="e.g. TechCorp Solutions"
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location || ''}
                          onChange={(e) => updateItem('experiences', exp.id, 'location', e.target.value)}
                          placeholder="e.g. San Francisco, CA (or Remote)"
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div className="flex gap-2 items-center">
                        <div className="flex-1">
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="text"
                            value={exp.startDate || ''}
                            onChange={(e) => updateItem('experiences', exp.id, 'startDate', e.target.value)}
                            placeholder="YYYY-MM (e.g. 2022-03)"
                            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            End Date
                          </label>
                          <input
                            type="text"
                            disabled={exp.current}
                            value={exp.current ? 'Present' : exp.endDate || ''}
                            onChange={(e) => updateItem('experiences', exp.id, 'endDate', e.target.value)}
                            placeholder="YYYY-MM or Present"
                            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100 disabled:text-slate-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.current || false}
                        onChange={(e) => updateItem('experiences', exp.id, 'current', e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      />
                      <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-700 cursor-pointer select-none">
                        I currently work in this role
                      </label>
                    </div>

                    {/* Bullet Points Description */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-slate-700">
                          Key Achievements & Bullet Points
                        </label>
                        <span className="text-[10px] text-slate-400">Use • for bullet points</span>
                      </div>

                      {/* Quick Action Verb Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" /> Insert Verb:
                        </span>
                        {SUGGESTED_VERBS.map(verb => (
                          <button
                            key={verb}
                            type="button"
                            onClick={() => insertVerb(exp.id, exp.description, verb)}
                            className="text-[10px] bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 px-1.5 py-0.5 rounded transition-all font-medium text-slate-600"
                          >
                            +{verb}
                          </button>
                        ))}
                      </div>

                      <textarea
                        rows={5}
                        value={exp.description || ''}
                        onChange={(e) => updateItem('experiences', exp.id, 'description', e.target.value)}
                        placeholder="• Spearheaded architecture of high-load data pipeline reducing latency by 45%&#10;• Orchestrated migration to Docker & Kubernetes, saving $12,000 monthly cloud expenditure..."
                        className="w-full text-xs p-3 font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
