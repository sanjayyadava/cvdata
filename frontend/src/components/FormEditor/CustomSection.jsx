import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Layers, Plus, Trash2, Edit2 } from 'lucide-react';

export default function CustomSection() {
  const {
    cv,
    addCustomSection,
    updateCustomSectionTitle,
    deleteCustomSection,
    addCustomItem,
    updateCustomItem,
    deleteCustomItem
  } = useResume();

  const customSections = cv.customSections || [];
  const [newSectionName, setNewSectionName] = useState('');

  function handleCreateSection(e) {
    e.preventDefault();
    if (!newSectionName.trim()) return;
    addCustomSection(newSectionName.trim());
    setNewSectionName('');
  }

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Custom Sections
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Add personalized sections: Speaking Engagements, Volunteer Work, Languages, Publications, or Patents.
        </p>
      </div>

      {/* Add new section form */}
      <form onSubmit={handleCreateSection} className="flex gap-2">
        <input
          type="text"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
          placeholder="Section name (e.g. Speaking & Conferences, Honors)..."
          className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Section</span>
        </button>
      </form>

      {/* Custom Sections List */}
      {customSections.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6">
          <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-500">No custom sections created yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {customSections.map((sec) => (
            <div key={sec.id} className="p-4 border border-slate-200 bg-white rounded-xl shadow-sm space-y-4">
              {/* Section Title Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <input
                  type="text"
                  value={sec.title || ''}
                  onChange={(e) => updateCustomSectionTitle(sec.id, e.target.value)}
                  className="font-bold text-sm text-slate-800 border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none px-1 py-0.5"
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addCustomItem(sec.id)}
                    className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Item
                  </button>
                  <button
                    onClick={() => deleteCustomSection(sec.id)}
                    className="text-slate-300 hover:text-red-600 p-1"
                    title="Delete Section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items in this Section */}
              <div className="space-y-3">
                {(sec.items || []).map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Title / Topic *</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => updateCustomItem(sec.id, item.id, 'title', e.target.value)}
                          placeholder="Title or Topic"
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Date / Year</label>
                        <input
                          type="text"
                          value={item.date || ''}
                          onChange={(e) => updateCustomItem(sec.id, item.id, 'date', e.target.value)}
                          placeholder="e.g. 2023"
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Subtitle / Organization</label>
                        <input
                          type="text"
                          value={item.subtitle || ''}
                          onChange={(e) => updateCustomItem(sec.id, item.id, 'subtitle', e.target.value)}
                          placeholder="e.g. Keynote at Tech Conference"
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Description</label>
                        <textarea
                          rows={2}
                          value={item.description || ''}
                          onChange={(e) => updateCustomItem(sec.id, item.id, 'description', e.target.value)}
                          placeholder="Details or link..."
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => deleteCustomItem(sec.id, item.id)}
                        className="text-[11px] text-red-500 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Remove item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
