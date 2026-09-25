import React from "react";
import { useResume } from "../../context/ResumeContext";

export default function ContactForm() {
  const { cv, updatePersonalInfo } = useResume();

  const personalInfo = cv?.personalInfo || {};

  const handleChange = (field, value) => {
    updatePersonalInfo(field, value);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Personal & Contact Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter your personal and professional information.
        </p>
      </div>

      <div className="space-y-5">

        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name *
          </label>

          <input
            type="text"
            value={personalInfo.fullName || ""}
            onChange={(e) =>
              handleChange("fullName", e.target.value)
            }
            placeholder="e.g. Sanjay Kumar"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Target Job Title *
          </label>

          <input
            type="text"
            value={personalInfo.jobTitle || ""}
            onChange={(e) =>
              handleChange("jobTitle", e.target.value)
            }
            placeholder="e.g. Python / FastAPI Developer"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address *
          </label>

          <input
            type="email"
            value={personalInfo.email || ""}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
            placeholder="e.g. sanjay@example.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Phone Number *
          </label>

          <input
            type="tel"
            value={personalInfo.phone || ""}
            onChange={(e) =>
              handleChange("phone", e.target.value)
            }
            placeholder="+91 98765 43210"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Location
          </label>

          <input
            type="text"
            value={personalInfo.location || ""}
            onChange={(e) =>
              handleChange("location", e.target.value)
            }
            placeholder="New Delhi, India"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Website */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Portfolio / Website
          </label>

          <input
            type="url"
            value={personalInfo.website || ""}
            onChange={(e) =>
              handleChange("website", e.target.value)
            }
            placeholder="https://yourwebsite.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            LinkedIn Profile
          </label>

          <input
            type="text"
            value={personalInfo.linkedin || ""}
            onChange={(e) =>
              handleChange("linkedin", e.target.value)
            }
            placeholder="linkedin.com/in/username"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            GitHub Profile
          </label>

          <input
            type="text"
            value={personalInfo.github || ""}
            onChange={(e) =>
              handleChange("github", e.target.value)
            }
            placeholder="github.com/username"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Summary */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Professional Summary
          </label>

          <textarea
            rows={6}
            value={personalInfo.summary || ""}
            onChange={(e) =>
              handleChange("summary", e.target.value)
            }
            placeholder="Write your professional summary..."
            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

      </div>
    </div>
  );
}