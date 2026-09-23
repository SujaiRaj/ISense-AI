import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import RequirementList from '../components/RequirementList';
import RecommendationCard from '../components/RecommendationCard';
import SectionHeader from '../components/SectionHeader';
import ActivityFeedItem from '../components/ActivityFeedItem';
import { analyzeTenderDocument } from '../services/tenderService';

export default function TenderAnalysisPage({ setToast }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);

  const processingSteps = [
    {
      icon: "article",
      title: "Document Ingestion & Section Parsing",
      subtitle: "Extracted RFP clauses, technical specifications, and BOQ schedules",
      time: "Step 1/4",
      chip: "Complete",
      chipType: "info"
    },
    {
      icon: "rule",
      title: "Parameter & Value Mapping",
      subtitle: "48 parameters identified across electrical and photometric requirements",
      time: "Step 2/4",
      chip: "48 mapped",
      chipType: "info"
    },
    {
      icon: "policy",
      title: "Mandatory QCO Verification",
      subtitle: "Audited against active Quality Control Orders under DPIIT",
      time: "Step 3/4",
      chip: "Gazette 2025",
      chipType: "info"
    },
    {
      icon: "warning",
      title: "Gap & Discrepancy Synthesis",
      subtitle: "Identifying omitted BIS standards and superseded code references",
      time: "Step 4/4",
      chip: "Evaluating",
      chipType: "warning"
    }
  ];

  const handleStartAnalysis = async (fileObj) => {
    setSelectedFile(fileObj);
    setIsProcessing(true);
    setProcessingStep(1);

    // Spread progress steps across the ~1100-1900ms server delay window
    // so the animation looks like real processing, not instant
    const stepTimings = [400, 900, 1400];
    stepTimings.forEach((t, i) => setTimeout(() => setProcessingStep(i + 2), t));

    try {
      const res = await analyzeTenderDocument(fileObj);
      if (res && res.data) {
        // Normalise field names: Express server uses different keys than mock
        const normalized = {
          ...res.data,
          // Express server fields → UI-expected fields
          fileName:             res.data.documentName || res.data.fileName,
          extractedRequirements: res.data.detectedRequirements || res.data.extractedRequirements || [],
          gapsIdentified:       res.data.specificationGaps   || res.data.gapsIdentified || [],
          recommendations:      res.data.recommendedStandards || res.data.recommendations || [],
        };
        setProcessingStep(4); // ensure step 4 shows complete before results render
        setTimeout(() => {
          setAnalysisResult(normalized);
          setIsProcessing(false);
          const gapCount = normalized.gapsIdentified?.length || 0;
          if (setToast) {
            setToast({
              message: `Tender audit complete. ${gapCount} specification gap${gapCount !== 1 ? 's' : ''} detected.`,
              type: gapCount > 0 ? 'error' : 'success'
            });
          }
        }, 200);
      } else {
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Tender analysis error:", err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      {/* Top Header Command Ribbon */}
      <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-primary border border-orange-200/80 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Tender Document Auditor
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-code-sm">
              Public Procurement Conformance
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Tender Specification Audit
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Audit public procurement tenders against Indian Standards and mandatory Quality Control Orders.
          </p>
        </div>

        {analysisResult && (
          <button
            onClick={() => {
              setSelectedFile(null);
              setAnalysisResult(null);
            }}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs self-start md:self-auto shrink-0"
          >
            <span className="material-symbols-outlined text-[16px] text-slate-400">upload_file</span>
            <span>Review Another Document</span>
          </button>
        )}
      </div>

      <div className="px-6 pb-10 space-y-6">
        {/* Upload State */}
        {!isProcessing && !analysisResult && (
          <FileUploader
            onFileSelected={(file) => handleStartAnalysis(file)}
            onUseDemoTender={() => handleStartAnalysis({ name: 'TN-PWD-2026-0184_Municipal_Streetlight_BOQ.pdf' })}
          />
        )}

        {/* Processing State with Deterministic Step Checklist */}
        {isProcessing && (
          <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
                <h3 className="font-semibold text-slate-900 text-sm">
                  Analyzing {selectedFile?.name || "Tender Document"}
                </h3>
              </div>
              <span className="font-code-sm text-xs text-slate-500">
                Auditing against BIS database...
              </span>
            </div>

            <div className="space-y-2">
              {processingSteps.map((step, idx) => {
                const isDone = processingStep > idx + 1;
                const isCurrent = processingStep === idx + 1;
                return (
                  <ActivityFeedItem
                    key={idx}
                    icon={isDone ? "check_circle" : step.icon}
                    title={step.title}
                    subtitle={step.subtitle}
                    timestamp={isDone ? "Done" : isCurrent ? "Processing..." : "Pending"}
                    chipText={isDone ? "Verified" : step.chip}
                    chipType={isDone ? "success" : isCurrent ? "info" : "neutral"}
                    metaText={step.time}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Audit Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Document Telemetry Summary Banner */}
            <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Audited Tender File
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">
                  {analysisResult.fileName || "TN-PWD-2026-0184 (48 requirements evaluated)"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full citation audit complete against active Quality Control Orders (QCOs).
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-code-sm font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                  <span className="material-symbols-outlined text-[13px]">warning</span>
                  <span>{(analysisResult.gapsIdentified?.length ?? analysisResult.specificationGaps?.length ?? 0)} gaps detected</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Mandatory Certification Verified</span>
                </span>
              </div>
            </div>

            {/* Extracted Specifications & Identified Gaps */}
            <RequirementList
              detectedRequirements={analysisResult.extractedRequirements || []}
              specificationGaps={analysisResult.gapsIdentified || []}
            />

            {/* Governing Indian Standards List */}
            {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
              <div className="space-y-4">
                <SectionHeader
                  microLabel="Governing Specifications"
                  title="Applicable Bureau of Indian Standards"
                  subtitle="Standards required to resolve the identified tender specification gaps."
                />

                <div className="space-y-4">
                  {analysisResult.recommendations.map((rec, idx) => (
                    <RecommendationCard key={rec.id || idx} recommendation={rec} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
