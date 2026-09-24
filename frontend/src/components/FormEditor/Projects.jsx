import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { FolderGit2, Plus, Trash2, Globe } from 'lucide-react';
import { Github } from '../icons/BrandIcons';

export default function Projects() {
  const { cv, addItem, updateItem, deleteItem } = useResume();
  const projects = cv.projects || [];

  function handleAddProject() {
    addItem('projects', {
      title: 'Full-Stack Web Application',
      description: 'Built a real-time web application with modern responsive UI and distributed backend services.',
      technologies: 'React, FastAPI, PostgreSQL, Tailwind CSS',
      link: 'https://demo.example.com',
      github: 'https://github.com/username/project'
    });
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-blue-600" />
            Projects & Open Source
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Key applications, libraries, or architecture demos that prove your practical skills.
          </p>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6">
          <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-600">No projects added yet.</p>
          <button
            onClick={handleAddProject}
            className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
          >
            + Add a featured project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-4 border border-slate-200 bg-white rounded-xl shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  {proj.title || 'Project Title'}
                </span>
                <button
                  onClick={() => deleteItem('projects', proj.id)}
                  className="text-slate-300 hover:text-red-600 transition-colors p-1"
                  title="Remove Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={proj.title || ''}
                    onChange={(e) => updateItem('projects', proj.id, 'title', e.target.value)}
                    placeholder="e.g. AI-Powered Code Reviewer"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Technologies / Tech Stack *
                  </label>
                  <input
                    type="text"
                    value={proj.technologies || ''}
                    onChange={(e) => updateItem('projects', proj.id, 'technologies', e.target.value)}
                    placeholder="e.g. React, Python FastAPI, PostgreSQL, Redis, Docker"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" /> Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={proj.link || ''}
                    onChange={(e) => updateItem('projects', proj.id, 'link', e.target.value)}
                    placeholder="https://app.example.com"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Github className="w-3 h-3 text-slate-400" /> Source Code URL
                  </label>
                  <input
                    type="url"
                    value={proj.github || ''}
                    onChange={(e) => updateItem('projects', proj.id, 'github', e.target.value)}
                    placeholder="https://github.com/user/repo"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Project Impact & Description
                  </label>
                  <textarea
                    rows={2}
                    value={proj.description || ''}
                    onChange={(e) => updateItem('projects', proj.id, 'description', e.target.value)}
                    placeholder="Briefly describe what problem it solved, architectural decisions, and key features..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
