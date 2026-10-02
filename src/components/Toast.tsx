import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast.visible) return null;

  const bgStyles =
    toast.type === 'success'
      ? 'bg-emerald-900/95 text-white border-emerald-700'
      : toast.type === 'error'
      ? 'bg-rose-900/95 text-white border-rose-700'
      : 'bg-slate-900/95 text-white border-slate-700';

  const Icon =
    toast.type === 'success' ? CheckCircle2 : toast.type === 'error' ? AlertCircle : Info;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md ${bgStyles}`}
      >
        <Icon className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-sm font-medium pr-2 leading-relaxed">{toast.message}</div>
        <button
          onClick={hideToast}
          className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors ml-auto"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
