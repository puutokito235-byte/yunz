import React from 'react';
import { Sparkles, ArrowRight, Layers, QrCode, Palette, HardDrive } from 'lucide-react';

interface HeaderNavProps {
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  onOpenContact: () => void;
  onOpenThemeModal: (theme: 'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onSelectCategory,
  activeCategory,
  onOpenContact,
  onOpenThemeModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/70 border-b border-teal-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectCategory('all')}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 group text-left cursor-pointer"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-slate-950 shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-teal-300 to-emerald-400">
            KHOI.DEV
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectCategory('all')}
            className={`hover:text-teal-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'all' ? 'text-teal-300 font-semibold' : ''
            }`}
          >
            Tất cả dự án
          </button>
          <button
            onClick={() => onOpenThemeModal('code-drive')}
            className="hover:text-teal-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <HardDrive className="w-3.5 h-3.5 text-teal-400" />
            Code Drive
          </button>
          <button
            onClick={() => onOpenThemeModal('code-qr')}
            className="hover:text-teal-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-teal-400" />
            Code QR
          </button>
          <button
            onClick={() => onOpenThemeModal('mau-tui-ban')}
            className="hover:text-teal-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-teal-400" />
            Màu tui bán
          </button>
          <button
            onClick={() => onOpenThemeModal('skill')}
            className="hover:text-teal-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            Skill
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenContact}
            className="btn-emerald-custom px-4 py-2 text-xs font-bold tracking-wide whitespace-nowrap shrink-0 cursor-pointer gap-2"
          >
            <span>Liên hệ hợp tác</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
