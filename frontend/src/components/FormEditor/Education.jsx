import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export default function Education() {
  const { cv, addItem, updateItem, deleteItem } = useResume();
  const education = cv.education || [];

  function handleAddEducation() {
    addItem('education', {
      degree: 'B.S. in Computer Science',
      institution: 'University Name',
      location: 'City, State',
      startDate: '2018-09',
      endDate: '2022-05',
      current: false,
      gpa: '3.8 / 4.0',
      description: 'Relevant coursework and academic achievements.'
    });
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Education & Degrees
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Degrees, academic honors, GPA, and relevant university coursework.
          </p>
        </div>
        <button
          onClick={handleAddEducation}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-600">No education entries added.</p>
          <button
            onClick={handleAddEducation}
            className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
          >
            + Add degree or program
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div
              key={edu.id}
              className="p-4 border border-slate-200 bg-white rounded-xl shadow-sm space-y-3 relative group"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  {edu.degree || 'Degree Program'}
                </span>
                <button
                  onClick={() => deleteItem('education', edu.id)}
                  className="text-slate-300 hover:text-red-600 transition-colors p-1"
                  title="Remove Education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Degree / Certificate *
                  </label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)}
                    placeholder="e.g. B.S. in Computer Science"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    College / University *
                  </label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => updateItem('education', edu.id, 'institution', e.target.value)}
                    placeholder="e.g. University of California, Berkeley"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={edu.location || ''}
                    onChange={(e) => updateItem('education', edu.id, 'location', e.target.value)}
                    placeholder="e.g. Berkeley, CA"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    GPA / Honors (Optional)
                  </label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateItem('education', edu.id, 'gpa', e.target.value)}
                    placeholder="e.g. 3.85 / 4.0 or Magna Cum Laude"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={edu.startDate || ''}
                    onChange={(e) => updateItem('education', edu.id, 'startDate', e.target.value)}
                    placeholder="YYYY-MM (e.g. 2018-09)"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Graduation Date
                  </label>
                  <input
                    type="text"
                    value={edu.endDate || ''}
                    onChange={(e) => updateItem('education', edu.id, 'endDate', e.target.value)}
                    placeholder="YYYY-MM (e.g. 2022-05)"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Highlights, Honors & Coursework
                </label>
                <textarea
                  rows={2}
                  value={edu.description || ''}
                  onChange={(e) => updateItem('education', edu.id, 'description', e.target.value)}
                  placeholder="Dean's List, Capstone Project, Algorithms, Cloud Architecture..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
