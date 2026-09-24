import React from 'react';
import { useResume } from '../context/ResumeContext';
import { X, Check, Palette, Sparkles, Layout, Type } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Tech',
    badge: 'Popular',
    color: '#2563eb',
    desc: 'Clean accent divider, categorized skills badges, modern layout.'
  },
  {
    id: 'executive',
    name: 'Executive Slate',
    badge: 'Leadership',
    color: '#0f766e',
    desc: 'Sophisticated serif typography, double border rule, distinguished tone.'
  },
  {
    id: 'minimal',
    name: 'Clean Minimalist',
    badge: '100% ATS',
    color: '#18181b',
    desc: 'Strict single-column Scandinavian minimalist layout with zero clutter.'
  },
  {
    id: 'tech',
    name: 'Dev & Code',
    badge: 'Developer',
    color: '#7c3aed',
    desc: 'Terminal-inspired header, monospaced accents, and tech tags.'
  }
];

const COLOR_PRESETS = [
  { name: 'Ocean Blue', hex: '#2563eb' },
  { name: 'Teal Slate', hex: '#0f766e' },
  { name: 'Royal Violet', hex: '#7c3aed' },
  { name: 'Emerald Green', hex: '#059669' },
  { name: 'Crimson Ruby', hex: '#dc2626' },
  { name: 'Charcoal Black', hex: '#1e293b' },
  { name: 'Amber Gold', hex: '#d97706' }
];

const FONTS = [
  { id: 'inter', name: 'Inter', desc: 'Modern & Clean Sans' },
  { id: 'roboto', name: 'Roboto', desc: 'Technical & Geometric' },
  { id: 'merriweather', name: 'Merriweather', desc: 'Classic Corporate Serif' },
  { id: 'playfair', name: 'Playfair Display', desc: 'Executive Editorial' }
];

export default function TemplateSelector({ isOpen, onClose }) {
  const { cv, updateMetadata } = useResume();
  const currentTemplate = cv?.metadata?.template || 'modern';
  const currentColor = cv?.metadata?.primaryColor || '#2563eb';
  const currentFont = cv?.metadata?.fontFamily || 'inter';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-800">Design & Layout Styling</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Layout className="w-4 h-4 text-blue-600" /> Choose Resume Template
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TEMPLATES.map((tmpl) => {
              const isSelected = currentTemplate === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => updateMetadata('template', tmpl.id)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-slate-800">{tmpl.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {tmpl.badge}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">{tmpl.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accent Color Palette */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-emerald-600" /> Accent Color
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {COLOR_PRESETS.map((color) => {
              const isSelected = currentColor.toLowerCase() === color.hex.toLowerCase();
              return (
                <button
                  key={color.hex}
                  onClick={() => updateMetadata('primaryColor', color.hex)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                    style={{ backgroundColor: color.hex }}
                  ></span>
                  <span>{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Family Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-purple-600" /> Typography
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {FONTS.map((f) => {
              const isSelected = currentFont === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => updateMetadata('fontFamily', f.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/50 shadow-2xs font-semibold'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-xs text-slate-800">{f.name}</div>
                  <div className="text-[10px] text-slate-400">{f.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            Apply Styling
          </button>
        </div>
      </div>
    </div>
  );
}
