import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Award, Plus, Trash2, ExternalLink } from 'lucide-react';

export default function Certifications() {
  const { cv, addItem, updateItem, deleteItem } = useResume();
  const certifications = cv.certifications || [];

  function handleAddCert() {
    addItem('certifications', {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-08',
      credentialUrl: 'https://aws.amazon.com/verification'
    });
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Certifications & Licenses
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified credentials (e.g. AWS, GCP, CKAD, CISSP) that validate your expertise.
          </p>
        </div>
        <button
          onClick={handleAddCert}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Certificate</span>
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6">
          <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-600">No certifications listed.</p>
          <button
            onClick={handleAddCert}
            className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
          >
            + Add a certificate or license
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-3.5 border border-slate-200 bg-white rounded-xl shadow-sm flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Certificate Name *</label>
                  <input
                    type="text"
                    value={cert.name || ''}
                    onChange={(e) => updateItem('certifications', cert.id, 'name', e.target.value)}
                    placeholder="e.g. AWS Solutions Architect"
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Issuer / Organization *</label>
                  <input
                    type="text"
                    value={cert.issuer || ''}
                    onChange={(e) => updateItem('certifications', cert.id, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Date Issued</label>
                  <input
                    type="text"
                    value={cert.issueDate || ''}
                    onChange={(e) => updateItem('certifications', cert.id, 'issueDate', e.target.value)}
                    placeholder="YYYY-MM (e.g. 2023-08)"
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => deleteItem('certifications', cert.id)}
                className="text-slate-300 hover:text-red-600 transition-colors p-1 sm:self-center self-end"
                title="Remove Certification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
