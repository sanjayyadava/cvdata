import React from 'react';

export default function ExecutiveTemplate({ cv }) {
  const { personal, experiences, education, skills, projects, certifications, customSections, metadata } = cv;
  const primaryColor = metadata?.primaryColor || '#0f766e';

  return (
    <div className="w-full text-slate-800 text-[11px] leading-relaxed select-text font-serif">
      {/* Header */}
      <div className="text-center pb-4 mb-4 border-b border-double border-slate-300">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
          {personal?.fullName || 'Your Name'}
        </h1>
        {personal?.jobTitle && (
          <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: primaryColor }}>
            {personal.jobTitle}
          </p>
        )}

        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-2 text-[10px] text-slate-600 font-sans">
          {personal?.location && <span>{personal.location}</span>}
          {personal?.phone && <span>&bull; {personal.phone}</span>}
          {personal?.email && <span>&bull; {personal.email}</span>}
          {personal?.linkedin && (
            <span>&bull; {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
          )}
          {personal?.website && (
            <span>&bull; {personal.website.replace(/^https?:\/\//, '')}</span>
          )}
        </div>
      </div>

      {/* Executive Summary */}
      {personal?.summary && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2 font-sans" style={{ color: primaryColor }}>
            Executive Summary
          </h2>
          <p className="text-slate-700 italic leading-relaxed text-justify text-[11px]">
            "{personal.summary}"
          </p>
        </div>
      )}

      {/* Professional Experience */}
      {experiences && experiences.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2 font-sans" style={{ color: primaryColor }}>
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between font-sans">
                  <div>
                    <span className="font-bold text-slate-900 text-xs">{exp.role}</span>
                    <span className="text-slate-600 font-medium"> | {exp.company}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.location && (
                  <div className="text-[10px] text-slate-500 italic mb-1 font-sans">{exp.location}</div>
                )}
                {exp.description && (
                  <div className="text-slate-700 text-[10.5px] space-y-0.5 mt-1">
                    {exp.description.split('\n').filter(Boolean).map((line, lidx) => (
                      <div key={lidx} className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">&mdash;</span>
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
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2 font-sans" style={{ color: primaryColor }}>
            Education & Academic Credentials
          </h2>
          <div className="space-y-2 font-sans">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-xs text-slate-800">{edu.degree}</span>
                  <span className="text-slate-600 text-xs"> — {edu.institution}</span>
                  {edu.gpa && <span className="text-[10px] text-slate-500"> (GPA: {edu.gpa})</span>}
                </div>
                <span className="text-[10px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Competencies & Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2 font-sans" style={{ color: primaryColor }}>
            Core Competencies & Capabilities
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-[10.5px] text-slate-700">
            {skills.map((s) => (
              <span key={s.id} className="font-medium">
                &bull; {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Board Advisory */}
      {certifications && certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2 font-sans" style={{ color: primaryColor }}>
            Certifications & Affiliations
          </h2>
          <div className="space-y-1 font-sans text-[10.5px]">
            {certifications.map((c) => (
              <div key={c.id}>
                <span className="font-bold text-slate-800">{c.name}</span>
                <span className="text-slate-600">, {c.issuer}</span>
                {c.issueDate && <span className="text-slate-500"> ({c.issueDate})</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections && customSections.map((sec) => (
        <div key={sec.id} className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-2 font-sans" style={{ color: primaryColor }}>
            {sec.title}
          </h2>
          <div className="space-y-2 font-sans">
            {(sec.items || []).map((item) => (
              <div key={item.id}>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-800">{item.title}</span>
                  <span className="text-[10px] text-slate-500">{item.date}</span>
                </div>
                {item.subtitle && <div className="text-[10px] text-slate-600 italic">{item.subtitle}</div>}
                {item.description && <p className="text-[10.5px] text-slate-700 mt-0.5">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
