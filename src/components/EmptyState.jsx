import React from 'react';
import { SearchX, FileSpreadsheet } from 'lucide-react';

export default function EmptyState({ 
  title = "No standards analysis yet", 
  description = "Start by entering a product specification or uploading a procurement document.",
  actionText = "New Standards Analysis",
  onReset 
}) {
  return (
    <div className="bg-white rounded-[4px] border border-[#E3E8ED] p-10 text-center my-6 max-w-xl mx-auto shadow-2xs">
      <div className="w-12 h-12 bg-[#F4F6F8] text-[#28536F] rounded-[4px] flex items-center justify-center mx-auto mb-3 border border-[#E3E8ED]">
        <FileSpreadsheet className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-[#0B1F33] mb-1">{title}</h3>
      <p className="text-xs text-[#61707D] mb-5 leading-relaxed">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="inst-btn-primary"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
