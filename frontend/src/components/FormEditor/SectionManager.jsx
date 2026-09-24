import React from 'react';
import { useResume } from '../../context/ResumeContext';
import PersonalInfo from './PersonalInfo';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import Certifications from './Certifications';
import CustomSection from './CustomSection';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Layers
} from 'lucide-react';

const TABS = [
  { id: 'personal', label: 'Contact', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certifications', label: 'Certs', icon: Award },
  { id: 'custom', label: 'Custom', icon: Layers }
];

export default function SectionManager() {
  const { activeTab, setActiveTab } = useResume();

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Horizontal Tab Navigation */}
      <div className="flex items-center overflow-x-auto border-b border-slate-200 bg-slate-50/80 p-1.5 gap-1 shrink-0">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Viewport */}
      <div className="p-4 sm:p-6 overflow-y-auto flex-1">
        {activeTab === 'personal' && <PersonalInfo />}
        {activeTab === 'experience' && <Experience />}
        {activeTab === 'education' && <Education />}
        {activeTab === 'skills' && <Skills />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'certifications' && <Certifications />}
        {activeTab === 'custom' && <CustomSection />}
      </div>
    </div>
  );
}
