"use client";

import { RefreshCw, Sparkles, HelpCircle } from "lucide-react";
import { useState } from "react";

interface MLPreviewProps {
  mlLoading: boolean;
  mlStatus: { category: string; confidence: number } | null;
}

export default function MLPreview({ mlLoading, mlStatus }: MLPreviewProps) {
  const [showHelp, setShowHelp] = useState(false);

  if (mlLoading) {
    return (
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <RefreshCw size={12} className="animate-spin" />
        <span>AI is analyzing...</span>
      </div>
    );
  }

  if (!mlStatus) return null;

  const confidencePercent = Math.round(mlStatus.confidence * 100);
  const confidenceColor =
    confidencePercent >= 80
      ? "text-green-600 bg-green-50 border-green-200"
      : confidencePercent >= 60
      ? "text-amber-600 bg-amber-50 border-amber-200"
      : "text-gray-600 bg-gray-50 border-gray-200";

  return (
    <div className="mt-2 space-y-2">
      <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border ${confidenceColor}`}>
        <Sparkles size={14} />
        <span className="font-medium">
          AI suggests: <strong>{mlStatus.category}</strong> ({confidencePercent}% confidence)
        </span>
        <button
          type="button"
          onClick={() => setShowHelp(!showHelp)}
          className="ml-auto hover:opacity-70 transition-opacity"
        >
          <HelpCircle size={14} />
        </button>
      </div>
      
      {showHelp && (
        <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="font-medium mb-1">Understanding AI Confidence:</p>
          <ul className="space-y-1 ml-4 list-disc">
            <li><strong>80-100%:</strong> High confidence. AI is very sure about this category.</li>
            <li><strong>60-79%:</strong> Medium confidence. AI thinks this is likely correct.</li>
            <li><strong>Below 60%:</strong> Low confidence. You may want to verify or change the category.</li>
          </ul>
          <p className="mt-2 text-gray-500">
            The AI learns from your transaction descriptions. More specific descriptions lead to better predictions.
          </p>
        </div>
      )}
    </div>
  );
}
