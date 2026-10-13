import React from 'react';
import {
  HardDrive,
  QrCode,
  Palette,
  Layers,
  Search,
  ArrowLeft,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface TopProgressBarProps {
  isLoading: boolean;
}

/**
 * Subtle top progress bar indicator across the viewport
 */
export const TopProgressBar: React.FC<TopProgressBarProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      role="progressbar"
      aria-label="Đang tải dữ liệu"
      aria-busy="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none overflow-hidden bg-slate-900/40 backdrop-blur-sm"
    >
      <div className="h-full w-full bg-gradient-to-r from-emerald-500 via-teal-300 to-cyan-400 shadow-[0_0_12px_rgba(45,212,191,0.85)] top-loader-bar" />
    </div>
  );
};

/**
 * Subtle floating spinner indicator pill
 */
export const SubtleSpinnerBadge: React.FC<{ label?: string }> = ({
  label = 'Đang tải dữ liệu...',
}) => {
  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/40 text-teal-200 text-xs font-medium shadow-xl backdrop-blur-md animate-fade-in">
      <Loader2 className="w-3.5 h-3.5 text-teal-300 animate-spin" />
      <span className="tracking-wide">{label}</span>
    </div>
  );
};

interface ThemeSkeletonProps {
  theme: 'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill';
}

/**
 * Subtle loading skeleton screens tailored for each theme page
 */
export const ThemePageSkeleton: React.FC<ThemeSkeletonProps> = ({ theme }) => {
  const getThemeMeta = () => {
    switch (theme) {
      case 'code-drive':
        return {
          title: 'Code Drive',
          icon: HardDrive,
          placeholder: 'Tìm kiếm code, liên kết, ngôn ngữ...',
        };
      case 'code-qr':
        return {
          title: 'Code QR Studio',
          icon: QrCode,
          placeholder: 'Tìm kiếm hoặc nhập nội dung mã QR...',
        };
      case 'mau-tui-ban':
        return {
          title: 'Màu Tui Bán',
          icon: Palette,
          placeholder: 'Tìm kiếm theo giá...',
        };
      case 'skill':
        return {
          title: 'Skill - Video Showcase',
          icon: Layers,
          placeholder: 'Tìm kiếm video...',
        };
    }
  };

  const meta = getThemeMeta();
  const Icon = meta.icon;

  return (
    <div className="w-full animate-fade-in">
      {/* 2. Theme title banner skeleton */}
      <div className="bg-slate-900/80 border border-teal-500/30 rounded-3xl p-5 sm:p-7 mb-7 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-3.5 sm:gap-4 mb-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center shadow-lg shrink-0 border border-teal-400/30">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 opacity-75" />
          </div>
          <div className="space-y-2 flex-1 max-w-md">
            <div className="h-6 sm:h-7 w-48 rounded-lg bg-slate-800/90 border border-teal-500/20 skeleton-shimmer" />
            <div className="h-3.5 w-64 rounded-md bg-slate-800/70 border border-teal-500/10 skeleton-shimmer" />
          </div>
        </div>

        {/* Search bar skeleton */}
        <div className="mt-4 pt-4 border-t border-teal-500/20">
          <div className="relative flex items-center max-w-xl">
            <Search className="w-4 h-4 text-teal-400/40 absolute left-3.5 pointer-events-none" />
            <div className="w-full h-10 rounded-xl bg-slate-950/80 border border-teal-500/30 skeleton-shimmer" />
          </div>
        </div>
      </div>

      {/* Subtle indicator bar */}
      <div className="flex items-center justify-center my-4">
        <SubtleSpinnerBadge label={`Đang tải ${meta.title}...`} />
      </div>

      {/* 3. Theme-specific skeleton layouts */}
      {theme === 'code-drive' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-5 w-40 rounded-md bg-slate-800/80 skeleton-shimmer" />
          </div>
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-teal-500/25 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-lg relative overflow-hidden"
            >
              {/* Left thumbnail skeleton */}
              <div className="w-full sm:w-28 h-24 rounded-xl bg-slate-800/90 border border-teal-500/30 shrink-0 skeleton-shimmer" />
              {/* Content skeleton */}
              <div className="flex-1 space-y-2.5 w-full">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-16 rounded bg-slate-800/90 skeleton-shimmer" />
                  <div className="h-5 w-14 rounded bg-slate-800/90 skeleton-shimmer" />
                </div>
                <div className="h-5 w-3/4 max-w-md rounded-md bg-slate-800/90 skeleton-shimmer" />
                <div className="h-3.5 w-1/2 max-w-xs rounded bg-slate-800/70 skeleton-shimmer" />
              </div>
              {/* Action button skeleton */}
              <div className="w-full sm:w-auto self-end sm:self-center">
                <div className="h-9 w-24 rounded-lg bg-slate-800/90 border border-teal-500/30 skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      )}

      {theme === 'code-qr' && (
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900/90 border border-teal-500/30 p-4 shadow-2xl relative overflow-hidden space-y-4">
            {/* 9:16 Video aspect skeleton */}
            <div className="w-full aspect-[9/16] rounded-2xl bg-slate-950 border border-teal-500/20 relative overflow-hidden skeleton-shimmer flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-slate-800/80 border border-teal-400/30 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-teal-400/50" />
              </div>
              {/* Corner QR code card skeleton */}
              <div className="absolute bottom-3 right-3 w-24 h-24 rounded-xl bg-slate-900/95 border border-teal-400/40 p-2 shadow-2xl">
                <div className="w-full h-full bg-slate-800/90 rounded skeleton-shimmer" />
              </div>
            </div>
            {/* Control buttons skeleton */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="h-9 w-28 rounded-lg bg-slate-800/90 skeleton-shimmer" />
              <div className="h-9 w-28 rounded-lg bg-slate-800/90 skeleton-shimmer" />
            </div>
          </div>
        </div>
      )}

      {theme === 'mau-tui-ban' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-5 w-44 rounded-md bg-slate-800/80 skeleton-shimmer" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-2xl bg-slate-900/90 border border-teal-500/25 p-2.5 shadow-lg overflow-hidden flex flex-col justify-end"
              >
                {/* 1:1 image skeleton shimmer */}
                <div className="absolute inset-0 skeleton-shimmer opacity-85" />
                {/* Simulated center placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-teal-400/20">
                  <Palette className="w-8 h-8" />
                </div>
                {/* Price tag badge skeleton */}
                <div className="relative z-10 h-7 w-20 rounded-md bg-slate-950/90 border border-teal-400/30 skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      )}

      {theme === 'skill' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-5 w-44 rounded-md bg-slate-800/80 skeleton-shimmer" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="aspect-[9/16] rounded-3xl bg-slate-900/90 border border-teal-500/30 relative overflow-hidden shadow-2xl p-4 flex flex-col justify-between"
              >
                <div className="absolute inset-0 skeleton-shimmer opacity-80" />
                {/* Top badge skeleton */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="h-6 w-24 rounded-full bg-slate-800/90 border border-teal-400/20 skeleton-shimmer" />
                  <div className="h-5 w-14 rounded bg-slate-800/80 skeleton-shimmer" />
                </div>
                {/* Center play icon skeleton */}
                <div className="relative z-10 self-center w-14 h-14 rounded-full bg-slate-800/80 border border-teal-400/40 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-teal-400/30" />
                </div>
                {/* Bottom title & metadata skeleton */}
                <div className="relative z-10 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-slate-800/90 skeleton-shimmer" />
                  <div className="h-3 w-1/3 rounded bg-slate-800/70 skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Subtle initial skeleton screen for app initialization
 */
export const AppInitializingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 sm:py-8 px-4 w-full max-w-lg mx-auto text-center animate-fade-in">
      {/* Avatar circle skeleton */}
      <div className="relative mb-5">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-900/90 border-4 border-teal-400/40 shadow-2xl skeleton-shimmer" />
      </div>

      {/* Name skeleton */}
      <div className="h-7 w-48 rounded-lg bg-slate-900/90 border border-teal-500/30 skeleton-shimmer mb-4" />

      {/* Social / Contact icons skeleton */}
      <div className="flex items-center justify-center gap-3 mb-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full bg-slate-900/90 border border-teal-500/30 skeleton-shimmer"
          />
        ))}
      </div>

      {/* Bio skeleton */}
      <div className="w-full max-w-xs space-y-2 mb-7">
        <div className="h-3.5 w-full rounded bg-slate-900/80 skeleton-shimmer" />
        <div className="h-3.5 w-4/5 mx-auto rounded bg-slate-900/80 skeleton-shimmer" />
      </div>

      {/* Subtle indicator */}
      <div className="mb-6">
        <SubtleSpinnerBadge label="Đang khởi tạo giao diện..." />
      </div>

      {/* 4 Theme button skeletons */}
      <div className="w-full max-w-xs space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-14 w-full rounded-2xl bg-slate-900/90 border border-teal-500/30 skeleton-shimmer shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};
