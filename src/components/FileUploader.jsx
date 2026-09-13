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
    <div className="bg-white rounded-[4px] border border-[#E3E8ED] p-5 mb-5 space-y-4 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E3E8ED] pb-3">
        <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-[#28536F]" />
          Document Intelligence Upload
        </h3>
        <button
          type="button"
          onClick={handleDemoClick}
          className="text-xs font-medium px-3 py-1 rounded-[3px] bg-[#F4F6F8] hover:bg-[#E3E8ED] text-[#12304A] border border-[#E3E8ED] transition-colors self-start flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 text-[#28536F]" />
          <span>Load Sample Tender Specification</span>
        </button>
      </div>

      {/* Drag & Drop Box */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border border-dashed rounded-[4px] p-6 text-center transition-colors ${
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

        <div className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 bg-[#12304A]/10 text-[#12304A] rounded-[4px] flex items-center justify-center mb-2 border border-[#12304A]/20">
            <FileText className="w-5 h-5 text-[#12304A]" />
          </div>

          {selectedFile ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-950 rounded-[3px] text-xs font-mono font-semibold border border-emerald-300 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Document Selected: {selectedFile.name}</span>
              </div>
              <p className="text-[11px] text-[#61707D] font-mono">Ready for Indian Standards technical extraction</p>
            </div>
          ) : (
            <>
              <p className="text-xs font-semibold text-[#0B1F33] mb-0.5">
                Drag and drop procurement tender or specification document
              </p>
              <p className="text-[11px] text-[#61707D] mb-3 font-mono">
                Supported formats: PDF, DOCX (Up to 25 MB document size)
              </p>
              <label
                htmlFor="tender-pdf-upload"
                className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0B1F33] hover:bg-[#12304A] text-white rounded-[3px] font-semibold text-xs transition-colors border border-[#12304A]"
              >
                Upload Document
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
