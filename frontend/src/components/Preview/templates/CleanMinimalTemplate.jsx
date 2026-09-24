import React from 'react';

export default function CleanMinimalTemplate({ cv }) {
  const { personal, experiences, education, skills, projects, certifications, customSections, metadata } = cv;
  const primaryColor = metadata?.primaryColor || '#18181b';

  return (
    <div className="w-full text-slate-800 text-[10.5px] leading-relaxed select-text font-sans max-w-[800px] mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">
          {personal?.fullName || 'Your Name'}
        </h1>
        {personal?.jobTitle && (
          <p className="text-xs font-semibold text-slate-600 mt-0.5">
            {personal.jobTitle}
          </p>
        )}

        <div className="text-[10px] text-slate-600 mt-1 flex flex-wrap gap-x-2">
          {personal?.location && <span>{personal.location}</span>}
          {personal?.phone && <span>| {personal.phone}</span>}
          {personal?.email && <span>| {personal.email}</span>}
          {personal?.linkedin && <span>| {personal.linkedin}</span>}
          {personal?.github && <span>| {personal.github}</span>}
          {personal?.website && <span>| {personal.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal?.summary && (
        <div className="mb-3.5">
          <div className="font-bold text-[11px] text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
            Summary
          </div>
          <p className="text-slate-700 leading-normal">
            {personal.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="mb-3.5">
          <div className="font-bold text-[11px] text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5">
            Experience
          </div>
          <div className="space-y-2.5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-slate-900">
                    {exp.role} &mdash; <span className="font-semibold">{exp.company}</span>
                  </div>
                  <div className="text-[9.5px] text-slate-500">
                    {exp.startDate} &ndash; {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.location && (
                  <div className="text-[9.5px] text-slate-500 italic">{exp.location}</div>
                )}
                {exp.description && (
                  <div className="mt-1 space-y-0.5 text-slate-700 pl-2">
                    {exp.description.split('\n').filter(Boolean).map((line, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-slate-400">&bull;</span>
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
        <div className="mb-3.5">
          <div className="font-bold text-[11px] text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5">
            Education
          </div>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-slate-900">
                    {edu.degree}, <span className="font-normal">{edu.institution}</span>
                  </div>
                  <div className="text-[9.5px] text-slate-500">
                    {edu.startDate} &ndash; {edu.endDate}
                  </div>
                </div>
                {edu.gpa && <div className="text-[9.5px] text-slate-600">GPA: {edu.gpa}</div>}
                {edu.description && <div className="text-[9.5px] text-slate-600">{edu.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-3.5">
          <div className="font-bold text-[11px] text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
            Skills
          </div>
          <div className="text-slate-700">
            {skills.map((s, idx) => (
              <span key={s.id}>
                <strong className="text-slate-800">{s.name}</strong>
                {s.level ? ` (${s.level})` : ''}
                {idx < skills.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-3.5">
          <div className="font-bold text-[11px] text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5">
            Key Projects
          </div>
          <div className="space-y-1.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="font-bold text-slate-900">
                  {proj.title}
                  {proj.technologies && <span className="font-normal text-slate-600 text-[9.5px]"> ({proj.technologies})</span>}
                </div>
                {proj.description && <p className="text-slate-700 text-[10px]">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-3.5">
          <div className="font-bold text-[11px] text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
            Certifications
          </div>
          <div className="space-y-0.5">
            {certifications.map((c) => (
              <div key={c.id}>
                <strong>{c.name}</strong> &mdash; {c.issuer} {c.issueDate ? `(${c.issueDate})` : ''}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections && customSections.map((sec) => (
        <div key={sec.id} className="mb-3.5">
          <div className="font-bold text-[11px] text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1">
            {sec.title}
          </div>
          <div className="space-y-1">
            {(sec.items || []).map((item) => (
              <div key={item.id}>
                <div className="flex justify-between">
                  <span className="font-bold">{item.title}</span>
                  <span className="text-[9.5px] text-slate-500">{item.date}</span>
                </div>
                {item.subtitle && <div className="text-[9.5px] text-slate-600">{item.subtitle}</div>}
                {item.description && <p className="text-[10px] text-slate-700">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
