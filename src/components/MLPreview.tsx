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
      <div className="mt-2 flex items-center gap-2 text-caption">
        <RefreshCw size={12} className="animate-spin" style={{ color: 'var(--ink)' }} />
        <span>AI is analyzing...</span>
      </div>
    );
  }

  if (!mlStatus) return null;

  const confidencePercent = Math.round(mlStatus.confidence * 100);
  const tone =
    confidencePercent >= 80
      ? { color: 'var(--success-green)' }
      : confidencePercent >= 60
      ? { color: 'var(--warning-amber)' }
      : { color: 'var(--error-red)' };

  return (
    <div className="mt-2 space-y-2">
      <div
        className="flex items-center gap-2 text-xs px-3 py-2 border-2"
        style={{ color: 'var(--ink)', background: '#f3f7d0', borderColor: 'var(--ink)' }}
      >
        <Sparkles size={14} style={{ color: 'var(--ink)' }} />
        <span className="font-medium">
          AI suggests: <strong>{mlStatus.category}</strong>{" "}
          <span style={{ color: tone.color, fontWeight: 700 }}>({confidencePercent}%)</span>
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
        <div
          className="text-xs rounded-lg p-3 border"
          style={{ color: 'var(--text-secondary)', background: 'var(--bg-tertiary)', borderColor: 'var(--border-default)' }}
        >
          <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Understanding AI Confidence:</p>
          <ul className="space-y-1 ml-4 list-disc">
            <li><strong>80-100%:</strong> High confidence. AI is very sure about this category.</li>
            <li><strong>60-79%:</strong> Medium confidence. AI thinks this is likely correct.</li>
            <li><strong>Below 60%:</strong> Low confidence. You may want to verify or change the category.</li>
          </ul>
          <p className="mt-2" style={{ color: 'var(--text-tertiary)' }}>
            The AI learns from your transaction descriptions. More specific descriptions lead to better predictions.
          </p>
        </div>
      )}
    </div>
  );
}
