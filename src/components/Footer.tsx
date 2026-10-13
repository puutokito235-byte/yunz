import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenThemeModal: (theme: 'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenThemeModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-teal-500/20 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copy */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-5 h-5 rounded-md bg-teal-400 text-slate-950 flex items-center justify-center font-bold text-xs">
              E
            </span>
            <span className="font-bold text-white text-sm tracking-tight">
              {PROFILE_INFO.name} · Emerald Studio
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Thiết kế & phát triển với hiệu ứng chuyển sắc ngọc bích tỏa đại dương sâu thẳm.
          </p>
        </div>

        {/* Quick Theme Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
          <button
            onClick={() => onOpenThemeModal('code-drive')}
            className="hover:text-teal-300 transition-colors cursor-pointer"
          >
            Code Drive
          </button>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <button
            onClick={() => onOpenThemeModal('code-qr')}
            className="hover:text-teal-300 transition-colors cursor-pointer"
          >
            Code QR
          </button>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <button
            onClick={() => onOpenThemeModal('mau-tui-ban')}
            className="hover:text-teal-300 transition-colors cursor-pointer"
          >
            Màu tui bán
          </button>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <button
            onClick={() => onOpenThemeModal('skill')}
            className="hover:text-teal-300 transition-colors cursor-pointer"
          >
            Skill
          </button>
        </div>

        {/* Back to top */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="btn-contrast-custom px-3 py-1.5 text-xs font-semibold gap-1.5 cursor-pointer"
            aria-label="Lên đầu trang"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Đầu trang</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
