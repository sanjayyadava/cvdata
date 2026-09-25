import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { User, Briefcase, Mail, Phone, MapPin, Globe, FileText, Info } from 'lucide-react';
import { Linkedin, Github } from '../icons/BrandIcons';

export default function PersonalInfo() {
  const { cv, updatePersonal } = useResume();
  const personal = cv.personalInfo || {};

  
  const summaryWords = personal.summary
    ? personal.summary.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Personal & Contact Information
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Recruiters and ATS scanners rely on these core details to identify and contact you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-400" /> Full Name *
          </label>
          <input
            type="text"
            value={personal.fullName || ''}
            onChange={(e) => updatePersonal('fullName', e.target.value)}
            placeholder="e.g. Alex Morgan"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Job Title / Target Role */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Target Job Title *
          </label>
          <input
            type="text"
            value={personal.jobTitle || ''}
            onChange={(e) => updatePersonal('jobTitle', e.target.value)}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address *
          </label>
          <input
            type="email"
            value={personal.email || ''}
            onChange={(e) => updatePersonal('email', e.target.value)}
            placeholder="e.g. alex.morgan@example.com"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number *
          </label>
          <input
            type="tel"
            value={personal.phone || ''}
            onChange={(e) => updatePersonal('phone', e.target.value)}
            placeholder="e.g. +1 (555) 234-5678"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location / City, Country
          </label>
          <input
            type="text"
            value={personal.location || ''}
            onChange={(e) => updatePersonal('location', e.target.value)}
            placeholder="e.g. San Francisco, CA (or Remote)"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Website / Portfolio */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" /> Portfolio / Website URL
          </label>
          <input
            type="url"
            value={personal.website || ''}
            onChange={(e) => updatePersonal('website', e.target.value)}
            placeholder="https://yourportfolio.dev"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Linkedin className="w-3.5 h-3.5 text-slate-400" /> LinkedIn Profile
          </label>
          <input
            type="url"
            value={personal.linkedin || ''}
            onChange={(e) => updatePersonal('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Github className="w-3.5 h-3.5 text-slate-400" /> GitHub Profile
          </label>
          <input
            type="url"
            value={personal.github || ''}
            onChange={(e) => updatePersonal('github', e.target.value)}
            placeholder="https://github.com/username"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-slate-400" /> Professional Summary
          </label>
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                summaryWords >= 35 && summaryWords <= 90
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {summaryWords} words (Target: 40–90)
            </span>
          </div>
        </div>

        <textarea
          rows={4}
          value={personal.summary || ''}
          onChange={(e) => updatePersonal('summary', e.target.value)}
          placeholder="Concise 3-4 sentence elevator pitch highlighting your core expertise, key achievements with metrics, and unique professional value..."
          className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all leading-relaxed"
        />

        <div className="flex items-start gap-1.5 text-[11px] text-slate-500 mt-1.5 bg-blue-50/50 p-2 rounded border border-blue-100">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
          <span>
            <strong>ATS Tip:</strong> Highlight your years of experience, primary tech stack (e.g. React & FastAPI), and 1-2 major business impacts (e.g. "boosted throughput by 42%").
          </span>
        </div>
      </div>
    </div>
  );
}
