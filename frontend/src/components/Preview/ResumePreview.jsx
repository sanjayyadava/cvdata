import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import CleanMinimalTemplate from './templates/CleanMinimalTemplate';
import TechCreativeTemplate from './templates/TechCreativeTemplate';
import { ZoomIn, ZoomOut, RotateCcw, Printer, Download } from 'lucide-react';
import { printResume } from '../../utils/exportPdf';
import { downloadBackendPDF } from '../../services/api';

export default function ResumePreview() {
  const { cv, zoomLevel, setZoomLevel } = useResume();
  const template = cv?.metadata?.template || 'modern';
  const fontFamily = cv?.metadata?.fontFamily || 'inter';

  const fontClassMap = {
    inter: 'font-inter',
    roboto: 'font-roboto',
    merriweather: 'font-merriweather',
    playfair: 'font-playfair',
  };

  const selectedFontClass = fontClassMap[fontFamily] || 'font-inter';

  function renderTemplate() {
    switch (template) {
      case 'executive':
        return <ExecutiveTemplate cv={cv} />;
      case 'minimal':
        return <CleanMinimalTemplate cv={cv} />;
      case 'tech':
        return <TechCreativeTemplate cv={cv} />;
      case 'modern':
      default:
        return <ModernTemplate cv={cv} />;
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-200/70 rounded-2xl border border-slate-300/70 overflow-hidden shadow-inner">
      {/* Top Preview Controls Toolbar */}
      <div className="no-print flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Live Preview</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 font-medium capitalize">
            {template} Template
          </span>
        </div>

        {/* Zoom & Quick Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-semibold text-slate-600 w-10 text-center select-none">
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(100)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors ml-1"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1"></div>

          <button
            onClick={() => printResume()}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Print Preview / Save PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Scrollable Canvas Area */}
      <div id="resume-print-container" className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
        {/* Paper Sheet */}
        <div
          id="resume-print-area"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className={`bg-white shadow-xl hover:shadow-2xl transition-shadow rounded-sm w-full max-w-[850px] min-h-[1100px] p-8 sm:p-12 border border-slate-200/80 ${selectedFontClass}`}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
