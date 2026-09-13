import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
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
        if (setToast) setToast({ message: "Tender document review complete.", type: "success" });
      }
    } catch (err) {
      console.error("Tender analysis error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 font-sans text-[#0F172A]">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] pb-4 space-y-1">
        <h1 className="text-2xl font-bold text-[#0F172A]">
          Tender Document Analysis
        </h1>
        <p className="text-xs text-[#64748B]">
          Review procurement documents and identify relevant standards and specification gaps.
        </p>
      </div>

      {/* File Upload Area */}
      {!isProcessing && !analysisResult && (
        <FileUploader
          onFileSelected={(file) => handleStartAnalysis(file)}
          onUseDemoTender={() => handleStartAnalysis('demo_tender_led.pdf')}
          isAnalyzing={isProcessing}
        />
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="p-8 bg-white border border-[#E2E8F0] rounded text-center space-y-3">
          <div className="w-5 h-5 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#0F172A] font-semibold">Analysing tender document...</p>
          <button
            type="button"
            onClick={handleProcessingComplete}
            className="hidden"
          >
            Trigger
          </button>
        </div>
      )}

      {/* Results Display */}
      {analysisResult && (
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
              <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                Extracted Requirements & Specification Gaps
              </h2>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setAnalysisResult(null);
                }}
                className="text-xs font-semibold text-[#0F172A] hover:underline"
              >
                Analyze Another Tender
              </button>
            </div>

            <p className="text-xs text-[#64748B]">
              Audited <strong>{analysisResult.fileName || "Tender_Specification_Document.pdf"}</strong> against Indian Standards knowledge base.
            </p>

            <RequirementList
              requirements={analysisResult.extractedRequirements || []}
              gaps={analysisResult.gapsIdentified || []}
            />
          </div>

          {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider border-b border-[#E2E8F0] pb-2">
                Governing Indian Standards
              </h2>
              {analysisResult.recommendations.map((rec, idx) => (
                <RecommendationCard key={rec.id || idx} recommendation={rec} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
