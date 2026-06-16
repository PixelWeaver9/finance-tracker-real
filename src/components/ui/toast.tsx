"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 200);
  };

  const tone = {
    success: { color: 'var(--success-green)' },
    error: { color: 'var(--error-red)' },
    info: { color: 'var(--ink)' },
  }[type];

  return (
    <div
      className={`card px-4 py-3 flex items-start gap-3 min-w-[300px] max-w-md transition-all ${
        isExiting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      }`}
      style={{
        background: '#ffffff',
        border: '2px solid var(--ink)',
        borderLeft: `6px solid ${tone.color}`,
      }}
    >
      <p className="flex-1 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{message}</p>
      <button
        onClick={handleClose}
        className="opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: 'var(--text-tertiary)' }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}
