"use client";

import { Brain, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

interface MLPreviewProps {
  mlLoading: boolean;
  mlStatus: { category: string; confidence: number } | null;
}

export default function MLPreview({ mlLoading, mlStatus }: MLPreviewProps) {
  return (
    <div
      className={`mt-2 px-3 py-2.5 rounded-lg border flex items-center gap-2 transition-all ${
        mlLoading
          ? "bg-zinc-900 border-zinc-800"
          : mlStatus
          ? mlStatus.confidence >= 0.5
            ? "bg-emerald-500/10 border-emerald-500/20"
            : "bg-yellow-500/10 border-yellow-500/20"
          : "bg-zinc-900 border-zinc-800"
      }`}
    >
      {mlLoading ? (
        <>
          <Brain size={14} className="text-blue-500 animate-pulse flex-shrink-0" />
          <span className="text-zinc-400 text-xs">AI mendeteksi...</span>
        </>
      ) : mlStatus ? (
        <>
          {mlStatus.confidence >= 0.5 ? (
            <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
          ) : (
            <AlertCircle size={14} className="text-yellow-500 flex-shrink-0" />
          )}
          <div>
            <span className="text-zinc-400 text-xs">Kategori: </span>
            <span
              className={`font-semibold text-xs ${
                mlStatus.confidence >= 0.5 ? "text-emerald-400" : "text-yellow-400"
              }`}
            >
              {mlStatus.category}
            </span>
            <span className="text-zinc-600 text-[10px] ml-1">
              ({Math.round(mlStatus.confidence * 100)}%)
            </span>
          </div>
        </>
      ) : (
        <>
          <Sparkles size={14} className="text-zinc-600 flex-shrink-0" />
          <span className="text-zinc-500 text-xs">Ketik deskripsi untuk auto-kategori</span>
        </>
      )}
    </div>
  );
}
