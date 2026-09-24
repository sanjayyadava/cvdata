import React from "react";

import { useResume } from "../../context/ResumeContext";

import ContactForm from "./ContactForm";

export default function SectionManager() {
  const {
    activeTab,
    setActiveTab,
  } = useResume();

  const tabs = [
    {
      id: "contact",
      label: "Personal & Contact",
    },
    {
      id: "experience",
      label: "Experience",
    },
    {
      id: "education",
      label: "Education",
    },
    {
      id: "skills",
      label: "Skills",
    },
    {
      id: "projects",
      label: "Projects",
    },
    {
      id: "certifications",
      label: "Certifications",
    },
    {
      id: "languages",
      label: "Languages",
    },
  ];

  function renderSection() {
    switch (activeTab) {
      case "contact":
        return <ContactForm />;

      case "experience":
        return (
          <div className="rounded-lg bg-white p-6">
            <h2 className="text-xl font-bold">
              Experience
            </h2>

            <p className="mt-2 text-slate-500">
              Experience form will be added here.
            </p>
          </div>
        );

      case "education":
        return (
          <div className="rounded-lg bg-white p-6">
            <h2 className="text-xl font-bold">
              Education
            </h2>

            <p className="mt-2 text-slate-500">
              Education form will be added here.
            </p>
          </div>
        );

      case "skills":
        return (
          <div className="rounded-lg bg-white p-6">
            <h2 className="text-xl font-bold">
              Skills
            </h2>

            <p className="mt-2 text-slate-500">
              Skills form will be added here.
            </p>
          </div>
        );

      case "projects":
        return (
          <div className="rounded-lg bg-white p-6">
            <h2 className="text-xl font-bold">
              Projects
            </h2>

            <p className="mt-2 text-slate-500">
              Projects form will be added here.
            </p>
          </div>
        );

      case "certifications":
        return (
          <div className="rounded-lg bg-white p-6">
            <h2 className="text-xl font-bold">
              Certifications
            </h2>

            <p className="mt-2 text-slate-500">
              Certifications form will be added here.
            </p>
          </div>
        );

      case "languages":
        return (
          <div className="rounded-lg bg-white p-6">
            <h2 className="text-xl font-bold">
              Languages
            </h2>

            <p className="mt-2 text-slate-500">
              Languages form will be added here.
            </p>
          </div>
        );

      default:
        return <ContactForm />;
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col">

      {/* Tabs */}

      <div className="mb-4 overflow-x-auto rounded-lg bg-white shadow-sm">

        <div className="flex min-w-max border-b">

          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`px-4 py-3 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}

        </div>

      </div>

      {/* Section */}

      <div className="min-h-0 flex-1 overflow-y-auto rounded-lg bg-white p-5 shadow-sm">

        {renderSection()}

      </div>

    </div>
  );
}