import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 border border-teal-400/50 text-white rounded-xl shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200">
      <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
      <span className="text-xs sm:text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
        aria-label="Đóng thông báo"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
