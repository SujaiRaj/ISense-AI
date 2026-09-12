import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';

export default function FileUploader({ onFileSelected, onUseDemoTender, isAnalyzing }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelected(file);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelected(file);
    }
  };

  const handleDemoClick = () => {
    const demoObj = { name: "Municipal_LED_Streetlight_Tender_2026.pdf", size: 2450000 };
    setSelectedFile(demoObj);
    onUseDemoTender();
  };

  return (
    <div className="bg-white rounded-md border border-slate-200 p-5 mb-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
          <UploadCloud className="w-4 h-4 text-slate-600" />
          Upload Specification Document
        </h3>
        <button
          type="button"
          onClick={handleDemoClick}
          className="text-xs font-medium px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors self-start"
        >
          📄 Load Sample Tender Specification
        </button>
      </div>

      {/* Drag & Drop Box */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border border-dashed rounded-md p-6 text-center transition-colors ${
          dragActive 
            ? 'border-blue-700 bg-blue-50/50' 
            : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
        }`}
      >
        <input
          type="file"
          id="tender-pdf-upload"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 bg-slate-200/70 text-slate-700 rounded-md flex items-center justify-center mb-2">
            <FileText className="w-5 h-5" />
          </div>

          {selectedFile ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-900 rounded text-xs font-medium border border-emerald-200 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Selected: {selectedFile.name}</span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal">Ready for specification review</p>
            </div>
          ) : (
            <>
              <p className="text-xs font-medium text-slate-800 mb-0.5">
                Drag & drop procurement tender document here
              </p>
              <p className="text-[11px] text-slate-500 mb-3 font-normal">
                Supported formats: PDF, DOCX (Max 25 MB)
              </p>
              <label
                htmlFor="tender-pdf-upload"
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-medium text-xs transition-colors"
              >
                Browse Files
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

