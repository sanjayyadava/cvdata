import React, { useState } from "react";
import { useResume } from "../../context/ResumeContext";

export default function ContactForm() {
  const {
    cv,
    updatePersonalInfo,
  } = useResume();

  const [message, setMessage] = useState("");

  const personalInfo = cv?.personalInfo || {};

  function handleChange(field, value) {
    updatePersonalInfo(field, value);

    setMessage("");
  }

  function handleAddInformation() {
    if (!personalInfo.fullName?.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!personalInfo.jobTitle?.trim()) {
      alert("Please enter your target job title.");
      return;
    }

    if (!personalInfo.email?.trim()) {
      alert("Please enter your email address.");
      return;
    }

    if (!personalInfo.phone?.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    setMessage(
      "✓ Personal & contact information added successfully."
    );
  }

  return (
    <div className="w-full">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Personal & Contact Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Recruiters and ATS scanners rely on these
          core details to identify and contact you.
        </p>

      </div>

      {/* Form */}

      <div className="space-y-5">

        {/* Full Name */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={personalInfo.fullName || ""}
            onChange={(e) =>
              handleChange(
                "fullName",
                e.target.value
              )
            }
            placeholder="e.g. Sanjay Kumar"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Target Job Title */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Target Job Title <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={personalInfo.jobTitle || ""}
            onChange={(e) =>
              handleChange(
                "jobTitle",
                e.target.value
              )
            }
            placeholder="e.g. Python / FastAPI Developer"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            value={personalInfo.email || ""}
            onChange={(e) =>
              handleChange(
                "email",
                e.target.value
              )
            }
            placeholder="e.g. sanjay@example.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Phone Number <span className="text-red-500">*</span>
          </label>

          <input
            type="tel"
            value={personalInfo.phone || ""}
            onChange={(e) =>
              handleChange(
                "phone",
                e.target.value
              )
            }
            placeholder="e.g. +91 98765 43210"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Location */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Location / City, Country
          </label>

          <input
            type="text"
            value={personalInfo.location || ""}
            onChange={(e) =>
              handleChange(
                "location",
                e.target.value
              )
            }
            placeholder="e.g. New Delhi, India"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Website */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Portfolio / Website URL
          </label>

          <input
            type="url"
            value={personalInfo.website || ""}
            onChange={(e) =>
              handleChange(
                "website",
                e.target.value
              )
            }
            placeholder="https://yourwebsite.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              handleChange(
                "linkedin",
                e.target.value
              )
            }
            placeholder="linkedin.com/in/username"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              handleChange(
                "github",
                e.target.value
              )
            }
            placeholder="github.com/username"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Summary */}

        <div>
          <div className="mb-2 flex items-center justify-between">

            <label className="block text-sm font-semibold text-slate-700">
              Professional Summary
            </label>

            <span className="text-xs text-slate-500">
              {(personalInfo.summary || "")
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .length}{" "}
              words
              {" "}
              <span className="text-slate-400">
                (Target: 40–90)
              </span>
            </span>

          </div>

          <textarea
            rows={7}
            value={personalInfo.summary || ""}
            onChange={(e) =>
              handleChange(
                "summary",
                e.target.value
              )
            }
            placeholder="Write a professional summary highlighting your experience, technology stack and major achievements..."
            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            ATS Tip: Highlight your years of experience,
            primary tech stack and 1–2 major business
            impacts.
          </p>
        </div>

        {/* Success */}

        {message && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        {/* Add Button */}

        <button
          type="button"
          onClick={handleAddInformation}
          className="w-full rounded-lg bg-blue-600 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
        >
          + Add Information
        </button>

      </div>
    </div>
  );
}