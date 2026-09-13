import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle2, FileSpreadsheet, RotateCcw } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import LoadingAnalysis from '../components/LoadingAnalysis';
import RequirementList from '../components/RequirementList';
import RecommendationCard from '../components/RecommendationCard';
import { analyzeTenderDocument } from '../services/tenderService';

export default function TenderAnalysisPage({ setToast }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleStartAnalysis = async (fileObj) => {
    setSelectedFile(fileObj);
    setIsProcessing(true);
  };

  const handleProcessingComplete = async () => {
    try {
      const res = await analyzeTenderDocument(selectedFile);
      if (res && res.data) {
        setAnalysisResult(res.data);
        if (setToast) setToast({ message: "Tender document specification review complete.", type: "success" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-mono text-[#28536F] font-bold uppercase tracking-wider mb-1">
          <FileSpreadsheet className="w-4 h-4 text-[#12304A]" />
          <span>Document Intelligence Workspace</span>
        </div>
        <h2 className="text-lg font-bold text-[#0B1F33] leading-tight mb-1">
          Tender & Specification Technical Review
        </h2>
        <p className="text-xs text-[#61707D]">
          Upload a procurement specification or RFP document (PDF/DOCX) to extract mandatory requirements and detect standards compliance gaps.
        </p>
      </div>

      {/* File Uploader */}
      {!isProcessing && !analysisResult && (
        <FileUploader
          onFileSelected={(file) => handleStartAnalysis(file)}
          onUseDemoTender={() => handleStartAnalysis('demo_tender_led.pdf')}
          isAnalyzing={isProcessing}
        />
      )}

      {/* Progress Panel */}
      {isProcessing && (
        <LoadingAnalysis
          onComplete={handleProcessingComplete}
          duration={2200}
        />
      )}

      {/* Document Review Output */}
      {!isProcessing && analysisResult && (
        <div className="space-y-5">
          {/* Document Summary Bar */}
          <div className="bg-white rounded-[4px] p-4 border border-[#E3E8ED] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shadow-2xs">
            <div>
              <div className="flex items-center gap-2 font-bold text-[#0B1F33] mb-0.5">
                <FileText className="w-4 h-4 text-[#12304A]" />
                <span>SPECIFICATION FILE: {analysisResult.documentName}</span>
              </div>
              <p className="text-[#61707D]">
                Length: 18 Pages • Extracted Category: <strong className="text-[#0B1F33]">{analysisResult.extractedProduct}</strong>
              </p>
            </div>

            <button
              onClick={() => {
                setAnalysisResult(null);
                setSelectedFile(null);
              }}
              className="inst-btn-secondary py-1.5 px-3 text-xs font-mono self-start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Review Another Document</span>
            </button>
          </div>

          {/* Extracted Requirements & Specification Gaps Section */}
          <RequirementList
            detectedRequirements={analysisResult.detectedRequirements}
            specificationGaps={analysisResult.specificationGaps}
          />

          {/* Recommended Applicable Standards */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-mono font-bold text-[#0B1F33] uppercase tracking-wider">
              Governing Indian Standards Identified ({analysisResult.recommendedStandards?.length || 0})
            </h3>

            <div className="space-y-4">
              {analysisResult.recommendedStandards?.map((rec, index) => (
                <RecommendationCard 
                  key={rec.id || index}
                  recommendation={rec}
                  rankIndex={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
