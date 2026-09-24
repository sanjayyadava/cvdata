import React from 'react';
import { Terminal, Code, Cpu, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { Github } from '../../icons/BrandIcons';

export default function TechCreativeTemplate({ cv }) {
  const { personal, experiences, education, skills, projects, certifications, customSections, metadata } = cv;
  const primaryColor = metadata?.primaryColor || '#7c3aed';

  return (
    <div className="w-full text-slate-800 text-[11px] leading-relaxed select-text font-mono">
      {/* Terminal Mock Header Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-xl mb-4 shadow-sm">
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          <span className="text-[10px] text-slate-400 font-sans ml-2">resume.sh — bash</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h1 className="text-xl font-black text-white font-sans tracking-tight">
              {personal?.fullName || 'Your Name'}
            </h1>
            <p className="text-xs font-semibold text-emerald-400 mt-0.5">
              &gt; {personal?.jobTitle || 'Developer'}
            </p>
          </div>
          <div className="text-[10px] text-slate-300 font-sans space-y-0.5 sm:text-right">
            <div>{personal?.email}</div>
            <div>{personal?.phone} {personal?.location ? `| ${personal.location}` : ''}</div>
          </div>
        </div>

        {/* Links row */}
        <div className="flex flex-wrap gap-3 mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
          {personal?.github && (
            <span className="flex items-center gap-1 text-slate-300">
              <Github className="w-3 h-3 text-slate-400" />
              {personal.github.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personal?.linkedin && (
            <span className="flex items-center gap-1 text-slate-300">
              [in] {personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
            </span>
          )}
          {personal?.website && (
            <span className="flex items-center gap-1 text-slate-300">
              [web] {personal.website.replace(/^https?:\/\//, '')}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personal?.summary && (
        <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-purple-600" />
            // ABOUT ME
          </div>
          <p className="text-slate-700 font-sans text-xs leading-normal">
            {personal.summary}
          </p>
        </div>
      )}

      {/* Skills Matrix */}
      {skills && skills.length > 0 && (
        <div className="mb-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-purple-600" />
            // TECH_STACK &amp; TOOLING
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span
                key={s.id}
                className="text-[10px] px-2 py-0.5 rounded bg-purple-50 border border-purple-200 text-purple-900 font-bold"
              >
                ${s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="mb-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Code className="w-3 h-3 text-purple-600" />
            // EXPERIENCE
          </div>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 pl-3" style={{ borderColor: primaryColor }}>
                <div className="flex justify-between items-baseline font-sans">
                  <div className="font-bold text-xs text-slate-900">
                    {exp.role} <span className="text-slate-600 font-normal">@ {exp.company}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    [{exp.startDate} ~ {exp.current ? 'now' : exp.endDate}]
                  </div>
                </div>
                {exp.description && (
                  <div className="text-[10.5px] font-sans text-slate-700 space-y-0.5 mt-1">
                    {exp.description.split('\n').filter(Boolean).map((line, lidx) => (
                      <div key={lidx} className="flex items-start gap-1.5">
                        <span className="text-purple-600 font-mono">&gt;</span>
                        <span className="flex-1">{line.replace(/^[•\-\*]\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <ExternalLink className="w-3 h-3 text-purple-600" />
            // REPOSITORIES &amp; PROJECTS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {projects.map((proj) => (
              <div key={proj.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50">
                <div className="font-bold text-xs text-slate-900 font-sans flex items-center justify-between">
                  <span>{proj.title}</span>
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-black">
                      <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <div className="text-[9.5px] text-purple-700 font-mono mt-0.5">
                    stack: [{proj.technologies}]
                  </div>
                )}
                {proj.description && (
                  <p className="text-[10px] font-sans text-slate-600 mt-1">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            // EDUCATION
          </div>
          <div className="space-y-1.5 font-sans">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-800">{edu.degree}</span>
                  <span className="text-slate-500"> — {edu.institution}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            // CERTIFICATIONS
          </div>
          <div className="space-y-1 font-sans text-xs">
            {certifications.map((c) => (
              <div key={c.id}>
                <span className="font-bold">{c.name}</span>
                <span className="text-slate-500"> ({c.issuer})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
