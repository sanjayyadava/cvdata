import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Wrench, Plus, Trash2, Tag, Check, Sparkles } from 'lucide-react';

const POPULAR_SKILLS = [
  { name: 'React', category: 'Frontend', level: 'Expert' },
  { name: 'TypeScript', category: 'Frontend', level: 'Expert' },
  { name: 'Python', category: 'Backend', level: 'Expert' },
  { name: 'FastAPI', category: 'Backend', level: 'Expert' },
  { name: 'Node.js', category: 'Backend', level: 'Advanced' },
  { name: 'PostgreSQL', category: 'Database', level: 'Advanced' },
  { name: 'Docker', category: 'DevOps', level: 'Advanced' },
  { name: 'Kubernetes', category: 'DevOps', level: 'Intermediate' },
  { name: 'AWS', category: 'Cloud', level: 'Advanced' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Expert' },
  { name: 'Redis', category: 'Database', level: 'Intermediate' },
  { name: 'Git & GitHub', category: 'Tools', level: 'Expert' },
  { name: 'REST APIs', category: 'Backend', level: 'Expert' },
  { name: 'GraphQL', category: 'Backend', level: 'Intermediate' },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Cloud', 'Tools'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function Skills() {
  const { cv, addItem, updateItem, deleteItem } = useResume();
  const skills = cv.skills || [];

  const [newSkillName, setNewSkillName] = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');
  const [newLevel, setNewLevel] = useState('Advanced');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  function handleAddCustomSkill(e) {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addItem('skills', {
      name: newSkillName.trim(),
      category: newCategory,
      level: newLevel
    });
    setNewSkillName('');
  }

  function handleAddPreset(preset) {
    const exists = skills.some(s => s.name.toLowerCase() === preset.name.toLowerCase());
    if (exists) return;
    addItem('skills', { ...preset });
  }

  const filteredSkills = selectedCategoryFilter === 'All'
    ? skills
    : skills.filter(s => s.category?.toLowerCase() === selectedCategoryFilter.toLowerCase());

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-600" />
          Technical Skills & Competencies
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          ATS parsers match job descriptions against keywords in your skills inventory.
        </p>
      </div>

      {/* Quick Suggestions Chips */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
        <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Quick Add Popular Skills:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SKILLS.map((preset) => {
            const isAdded = skills.some(s => s.name.toLowerCase() === preset.name.toLowerCase());
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleAddPreset(preset)}
                disabled={isAdded}
                className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all flex items-center gap-1 border ${
                  isAdded
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-default'
                    : 'bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-300 shadow-2xs hover:border-blue-400'
                }`}
              >
                {isAdded && <Check className="w-3 h-3 text-emerald-600" />}
                {preset.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual Input Form */}
      <form onSubmit={handleAddCustomSkill} className="flex flex-wrap sm:flex-nowrap gap-2 items-center bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          placeholder="Skill name (e.g. Next.js, PyTorch)..."
          className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-w-[140px]"
        />

        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="text-xs px-2.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-700"
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="DevOps">DevOps</option>
          <option value="Cloud">Cloud</option>
          <option value="Tools">Tools</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value)}
          className="text-xs px-2.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-700"
        >
          {LEVELS.map(lvl => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>

        <button
          type="submit"
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all shrink-0 flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>

      {/* Filter by Category */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategoryFilter(cat)}
            className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all whitespace-nowrap ${
              selectedCategoryFilter === cat
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Skills List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs group hover:border-slate-300 transition-all"
          >
            <div className="min-w-0 pr-2">
              <div className="text-xs font-bold text-slate-800 truncate">
                {skill.name}
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                <span className="px-1.5 py-0.2 rounded bg-slate-100 font-medium">
                  {skill.category || 'General'}
                </span>
                <span className="text-blue-600 font-medium">
                  {skill.level}
                </span>
              </div>
            </div>

            <button
              onClick={() => deleteItem('skills', skill.id)}
              className="text-slate-300 hover:text-red-600 p-1 transition-colors"
              title="Delete Skill"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
