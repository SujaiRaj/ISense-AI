import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle2 } from 'lucide-react';
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
      <div className="bg-white rounded-md p-5 border border-slate-200">
        <h2 className="text-2xl font-semibold text-slate-900 leading-tight mb-1">
          Tender Review
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Upload a procurement specification document to identify applicable standards and specification gaps.
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
          <div className="bg-white rounded-md p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="flex items-center gap-2 font-medium text-slate-900 mb-0.5">
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Document: {analysisResult.documentName}</span>
              </div>
              <p className="text-slate-500 font-normal">
                Pages: 18 • Detected Product Scope: <strong className="text-slate-800 font-medium">{analysisResult.extractedProduct}</strong>
              </p>
            </div>

            <button
              onClick={() => {
                setAnalysisResult(null);
                setSelectedFile(null);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded font-medium transition-colors self-start"
            >
              Review Another Specification
            </button>
          </div>

          {/* Extracted Requirements & Specification Gaps Section */}
          <RequirementList
            detectedRequirements={analysisResult.detectedRequirements}
            specificationGaps={analysisResult.specificationGaps}
          />

          {/* Recommended Applicable Standards */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-semibold text-slate-900">
              Recommended Applicable Standards ({analysisResult.recommendedStandards?.length || 0})
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

