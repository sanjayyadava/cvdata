import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { Linkedin, Github } from '../../icons/BrandIcons';

export default function ModernTemplate({ cv }) {
  const { personal, experiences, education, skills, projects, certifications, customSections, metadata } = cv;
  const primaryColor = metadata?.primaryColor || '#2563eb';

  return (
    <div className="w-full text-slate-800 text-[11px] leading-relaxed select-text font-sans">
      {/* Header */}
      <div className="border-b-2 pb-4 mb-4" style={{ borderColor: primaryColor }}>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              {personal?.fullName || 'Your Name'}
            </h1>
            {personal?.jobTitle && (
              <p className="text-sm font-bold mt-0.5" style={{ color: primaryColor }}>
                {personal.jobTitle}
              </p>
            )}
          </div>
        </div>

        {/* Contact Badges */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-2 text-[10px] text-slate-600">
          {personal?.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400" />
              <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
            </span>
          )}
          {personal?.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{personal.location}</span>
            </span>
          )}
          {personal?.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-400" />
              <a href={personal.website} target="_blank" rel="noreferrer" className="hover:underline">
                {personal.website.replace(/^https?:\/\//, '')}
              </a>
            </span>
          )}
          {personal?.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-slate-400" />
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                {personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            </span>
          )}
          {personal?.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3 text-slate-400" />
              <a href={personal.github} target="_blank" rel="noreferrer" className="hover:underline">
                {personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personal?.summary && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2" style={{ color: primaryColor }}>
            <span>Professional Summary</span>
            <span className="flex-1 h-px bg-slate-200"></span>
          </h2>
          <p className="text-slate-700 leading-normal text-justify">
            {personal.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: primaryColor }}>
            <span>Work Experience</span>
            <span className="flex-1 h-px bg-slate-200"></span>
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <div className="font-bold text-slate-900 text-xs">
                    {exp.role}{' '}
                    <span className="font-semibold text-slate-600">
                      — {exp.company}
                    </span>
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 whitespace-nowrap">
                    {exp.location ? `${exp.location} | ` : ''}
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>

                {exp.description && (
                  <div className="text-slate-700 space-y-0.5 pl-1">
                    {exp.description.split('\n').filter(Boolean).map((line, lidx) => (
                      <div key={lidx} className="flex items-start gap-1.5">
                        <span className="text-slate-400 font-bold leading-none mt-1">&bull;</span>
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

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: primaryColor }}>
            <span>Education</span>
            <span className="flex-1 h-px bg-slate-200"></span>
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex items-baseline justify-between">
                  <div className="font-bold text-slate-900 text-xs">
                    {edu.degree}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500">
                    {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                  </div>
                </div>
                <div className="text-[10px] text-slate-600 font-medium">
                  {edu.institution} {edu.location ? `— ${edu.location}` : ''}
                  {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                </div>
                {edu.description && (
                  <div className="text-[10px] text-slate-600 mt-0.5">
                    {edu.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: primaryColor }}>
            <span>Skills & Expertise</span>
            <span className="flex-1 h-px bg-slate-200"></span>
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-slate-50 border-slate-200 text-slate-700"
              >
                {skill.name}
                {skill.level && (
                  <span className="text-[9px] text-slate-400 font-normal ml-1">
                    ({skill.level})
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: primaryColor }}>
            <span>Featured Projects</span>
            <span className="flex-1 h-px bg-slate-200"></span>
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span>{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-[10px] inline-flex items-center gap-0.5">
                        <ExternalLink className="w-2.5 h-2.5" /> Demo
                      </a>
                    )}
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="text-slate-600 hover:underline text-[10px] inline-flex items-center gap-0.5">
                        <Github className="w-2.5 h-2.5" /> Code
                      </a>
                    )}
                  </div>
                </div>
                {proj.technologies && (
                  <div className="text-[10px] text-slate-500 font-mono">
                    Stack: {proj.technologies}
                  </div>
                )}
                {proj.description && (
                  <p className="text-[10.5px] text-slate-700 mt-0.5">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: primaryColor }}>
            <span>Certifications</span>
            <span className="flex-1 h-px bg-slate-200"></span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {certifications.map((c) => (
              <div key={c.id} className="text-[10px]">
                <span className="font-bold text-slate-800">{c.name}</span>
                <span className="text-slate-500"> — {c.issuer} {c.issueDate ? `(${c.issueDate})` : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections && customSections.map((sec) => (
        <div key={sec.id} className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: primaryColor }}>
            <span>{sec.title}</span>
            <span className="flex-1 h-px bg-slate-200"></span>
          </h2>
          <div className="space-y-1.5">
            {(sec.items || []).map((item) => (
              <div key={item.id}>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-bold text-slate-800">{item.title}</span>
                  <span className="text-[10px] text-slate-500">{item.date}</span>
                </div>
                {item.subtitle && (
                  <div className="text-[10px] text-slate-600 italic">{item.subtitle}</div>
                )}
                {item.description && (
                  <p className="text-[10px] text-slate-700 mt-0.5">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
