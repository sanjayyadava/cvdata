import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SectionManager from './components/FormEditor/SectionManager';
import ResumePreview from './components/Preview/ResumePreview';
import TemplateSelector from './components/TemplateSelector';
import AtsScoreModal from './components/AtsChecker/AtsScoreModal';
import { useEffect } from "react";
import { getCVs } from "./services/api";

export default function App() {
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  useEffect(() => {
  getCVs()
    .then((data) => {
      console.log("CV DATA:", data);
    })
    .catch((error) => {
      console.error("API ERROR:", error);
    });
}, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      {/* Top Navigation */}
      <Navbar onOpenTemplates={() => setTemplateModalOpen(true)} />

      {/* Main Workspace (Split View) */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-4 h-[calc(100vh-4rem)] overflow-hidden">
        {/* Left: Interactive Form Editor (Scrollable) */}
        <section className="no-print lg:w-[46%] xl:w-[42%] h-full flex flex-col">
          <SectionManager />
        </section>

        {/* Right: Live Resume Preview (Paper view) */}
        <section className="lg:w-[54%] xl:w-[58%] h-full flex flex-col">
          <ResumePreview />
        </section>
      </main>

      {/* Design & Template Modal */}
      <TemplateSelector
        isOpen={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
      />

      {/* ATS Score & Optimization Modal */}
      <AtsScoreModal />
    </div>
  );
}
