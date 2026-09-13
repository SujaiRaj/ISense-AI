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
    <div className="bg-white rounded-lg border border-[#E3E8ED] p-6 sm:p-8 space-y-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3E8ED] pb-4">
        <h2 className="text-sm font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-[#28536F]" />
          <span>Upload Tender Document</span>
        </h2>
        <button
          type="button"
          onClick={handleDemoClick}
          className="text-xs font-semibold px-3 py-1.5 rounded bg-[#F4F6F8] hover:bg-[#E3E8ED] text-[#12304A] border border-[#E3E8ED] transition-colors self-start sm:self-auto flex items-center gap-1.5"
        >
          <FileText className="w-4 h-4 text-[#28536F]" />
          <span>Load Sample Tender Document</span>
        </button>
      </div>

      {/* Drag & Drop Box */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-[#12304A] bg-[#12304A]/5' 
            : 'border-[#E3E8ED] hover:border-[#28536F] bg-[#F4F6F8]'
        }`}
      >
        <input
          type="file"
          id="tender-pdf-upload"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 bg-[#12304A]/10 text-[#12304A] rounded-lg flex items-center justify-center border border-[#12304A]/20">
            <FileText className="w-6 h-6 text-[#12304A]" />
          </div>

          {selectedFile ? (
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-950 rounded text-xs font-semibold border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Selected: {selectedFile.name}</span>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold text-[#0B1F33]">
                Drag and drop your tender PDF or DOCX file
              </p>
              <p className="text-xs text-[#61707D]">
                Supported formats: PDF, DOCX (Up to 25 MB)
              </p>
              <label
                htmlFor="tender-pdf-upload"
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F33] hover:bg-[#12304A] text-white rounded-md font-semibold text-xs transition-colors"
              >
                Choose File
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

