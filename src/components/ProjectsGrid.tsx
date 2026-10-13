import React from 'react';
import {
  HardDrive,
  QrCode,
  Palette,
  Layers,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectsGridProps {
  projects: Project[];
  onOpenProjectDetail: (project: Project) => void;
  onOpenThemePage: (theme: 'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill') => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  onOpenProjectDetail,
  onOpenThemePage,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'code-drive':
        return <HardDrive className="w-4 h-4 text-teal-400" />;
      case 'code-qr':
        return <QrCode className="w-4 h-4 text-cyan-400" />;
      case 'mau-tui-ban':
        return <Palette className="w-4 h-4 text-emerald-400" />;
      case 'skill':
        return <Layers className="w-4 h-4 text-sky-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-teal-300" />;
    }
  };

  return (
    <section id="projects-section" className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header - Clean title, NO search input on main page */}
      <div className="text-center mb-10 pb-6 border-b border-teal-500/20 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-wider text-teal-300 mb-1.5 block">
          Kho Dự Án Tiêu Biểu
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Các Sản Phẩm & Giải Pháp Chọn Lọc
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          Nhấp vào mỗi thẻ dự án để xem kiến trúc chi tiết và trải nghiệm thử nghiệm thực tế.
        </p>
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {projects.map((project) => {
          return (
            <div
              key={project.id}
              onClick={() => onOpenProjectDetail(project)}
              className="group relative bg-slate-900/60 hover:bg-slate-900/80 border border-teal-500/20 hover:border-teal-400/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1.5"
            >
              {/* Visual Card Cover / Graphic Preview */}
              <div
                className={`h-40 w-full relative overflow-hidden bg-gradient-to-br ${project.coverGradient} flex items-center justify-center p-6`}
              >
                {/* Subtle decorative grid mesh */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

                {/* High-tech Graphic Icon Container */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {getCategoryIcon(project.category)}
                </div>

                {/* Version tag top right */}
                <div className="absolute top-3 right-3 text-[11px] font-mono text-white/90 bg-slate-950/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                  {project.version}
                </div>

                {/* Release date top left */}
                <div className="absolute top-3 left-3 text-[11px] font-mono text-white/90 bg-slate-950/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                  {project.releaseDate}
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex items-center gap-2 text-xs text-teal-300/90 font-medium mb-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          project.category === 'code-drive' ||
                          project.category === 'code-qr' ||
                          project.category === 'mau-tui-ban' ||
                          project.category === 'skill'
                        ) {
                          onOpenThemePage(project.category);
                        }
                      }}
                      className="hover:underline font-semibold"
                    >
                      {project.categoryLabel}
                    </button>
                    <span aria-hidden="true">·</span>
                    <span>{project.clientOrScope}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-teal-200 transition-colors tracking-tight mb-2">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-300/80 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-teal-300 bg-teal-950/50 border border-teal-500/20 px-2 py-0.5 rounded-md font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[11px] text-slate-400 self-center">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400 font-medium group-hover:text-teal-300 transition-colors">
                    Chi tiết dự án
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProjectDetail(project);
                    }}
                    className="btn-emerald-custom px-3.5 py-1.5 text-xs font-bold gap-1.5 cursor-pointer"
                  >
                    <span>Xem chi tiết</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
