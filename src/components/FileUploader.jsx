import React, { useState } from 'react';

export default function FileUploader({ onFileSelected, onUseDemoTender }) {
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
    const demoObj = { name: "TN-PWD-2026-0184_Municipal_Streetlight_BOQ.pdf", size: 2450000 };
    setSelectedFile(demoObj);
    onUseDemoTender();
  };

  return (
    <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="font-headline-sm font-semibold text-slate-900 text-sm">
            Upload Tender Specification Document
          </h2>
          <p className="font-body-sm text-slate-500 text-xs mt-0.5">
            Ingest RFP, BOQ, or scope of work document to cross-reference Indian Standards.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDemoClick}
          className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px] text-slate-400">description</span>
          <span>Load Sample BOQ</span>
        </button>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border border-dashed rounded-lg p-7 text-center transition-all ${
          dragActive
            ? 'border-primary bg-orange-50/40'
            : 'border-slate-300 hover:border-primary/40 bg-slate-50/50'
        }`}
      >
        <input
          type="file"
          id="tender-pdf-upload"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <span className="material-symbols-outlined text-[28px] text-slate-400">
            upload_file
          </span>

          {selectedFile ? (
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-code-sm text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Selected: {selectedFile.name}</span>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs font-semibold text-slate-800">
                Drag and drop your tender PDF or DOCX file
              </p>
              <p className="text-[11px] text-slate-400">
                Up to 25MB • Section-by-section parameter extraction
              </p>

              <label
                htmlFor="tender-pdf-upload"
                className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-[#C2410C] text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 mt-2 transition-all shadow-xs"
              >
                <span>Browse Local Files</span>
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
