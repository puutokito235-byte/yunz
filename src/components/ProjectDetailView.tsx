import React, { useState } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Check,
  Copy,
  Calendar,
  Layers,
  Sparkles,
  Download,
  Share2,
  HardDrive,
  QrCode,
  Palette,
  ShieldCheck,
  Zap,
  Code2,
} from 'lucide-react';
import { Project } from '../data/portfolioData';
import { generateQrMatrix } from '../utils/qrGenerator';

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
  allProjects: Project[];
  onShowToast: (message: string) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
  onSelectProject,
  allProjects,
  onShowToast,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // State for interactive QR simulator if QR project
  const [qrText, setQrText] = useState('https://emerald.dev/matrix-qr');
  const [qrFgColor, setQrFgColor] = useState('#14b8a6');
  const [qrBgColor, setQrBgColor] = useState('#030a1c');

  // State for interactive Palette simulator if palette project
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Related projects
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    onShowToast('Đã sao chép liên kết dự án vào bộ nhớ tạm!');
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    onShowToast(`Đã copy mã màu: ${hex}`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Generate QR matrix for the live preview
  const qrMatrix = React.useMemo(() => {
    return generateQrMatrix(qrText);
  }, [qrText]);

  return (
    <article className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* 1. Top Navigation Bar with Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="btn-emerald-custom px-4 py-2 text-xs font-bold gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách dự án</span>
        </button>

        {/* Clean unboxed Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-teal-200/80 font-medium">
          <button onClick={onBack} className="hover:underline hover:text-white cursor-pointer">
            Trang chủ
          </button>
          <span aria-hidden="true">/</span>
          <span>{project.categoryLabel}</span>
          <span aria-hidden="true">/</span>
          <span className="text-white font-semibold truncate max-w-[200px]">
            {project.title}
          </span>
        </div>
      </div>

      {/* 2. Project Hero Card */}
      <header className="relative bg-slate-900/70 border border-teal-500/25 rounded-3xl p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl backdrop-blur-md">
        {/* Ambient background blur */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"
        />

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-teal-300 font-medium mb-4">
          <span className="bg-teal-950/70 border border-teal-500/30 text-teal-200 px-3 py-1 rounded-md font-semibold">
            {project.categoryLabel}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            Ra mắt: {project.releaseDate}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-teal-400 font-semibold">{project.version}</span>
        </div>

        {/* Project Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 text-balance">
          {project.title}
        </h1>

        {/* Summary */}
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans mb-8 max-w-3xl">
          {project.summary}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 border-t border-teal-500/20">
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-emerald-custom px-5 py-2.5 text-xs sm:text-sm font-bold gap-2 cursor-pointer"
          >
            <span>Trải nghiệm Live Demo</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contrast-custom px-4 py-2.5 text-xs sm:text-sm font-bold gap-2 cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>Xem mã nguồn GitHub</span>
          </a>

          <button
            onClick={handleShare}
            className="btn-contrast-custom px-4 py-2.5 text-xs sm:text-sm font-bold gap-2 cursor-pointer"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Đã copy link' : 'Chia sẻ'}</span>
          </button>
        </div>
      </header>

      {/* 3. Interactive Sandbox / Simulator Container depending on project type */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-300" />
            Khung Thử Nghiệm Tương Tác Trực Tiếp (Interactive Sandbox)
          </h2>
          <span className="text-xs text-teal-300 font-mono">100% Realtime Client-side</span>
        </div>

        <div className="bg-slate-900/80 border border-teal-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          {project.category === 'code-qr' ? (
            /* Live QR Generator Playground */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-teal-200">
                  Tùy chỉnh mã QR thời gian thực
                </h3>
                <p className="text-xs text-slate-300">
                  Nhập nội dung bất kỳ (URL trang web, văn bản, số tài khoản) để kiểm chứng thuật toán tạo vector QR code ngay trên trình duyệt:
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nội dung mã QR:
                  </label>
                  <input
                    type="text"
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    className="w-full bg-slate-950/80 border border-teal-500/30 text-white rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-teal-400"
                    placeholder="https://vidu.vn hoặc số điện thoại..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Màu điểm (Foreground):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={qrFgColor}
                        onChange={(e) => setQrFgColor(e.target.value)}
                        className="w-8 h-8 rounded border border-teal-500/40 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-xs text-slate-300 uppercase">{qrFgColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Màu nền (Background):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={qrBgColor}
                        onChange={(e) => setQrBgColor(e.target.value)}
                        className="w-8 h-8 rounded border border-teal-500/40 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-xs text-slate-300 uppercase">{qrBgColor}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onShowToast('Đã tạo và sẵn sàng tải về định dạng Vector SVG!')}
                    className="btn-emerald-custom px-4 py-2 text-xs font-bold gap-2 cursor-pointer w-full sm:w-auto"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải mã QR SVG</span>
                  </button>
                </div>
              </div>

              {/* Rendered SVG QR Canvas */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-950/90 rounded-2xl border border-teal-500/20">
                <div
                  className="p-4 rounded-xl shadow-2xl transition-all"
                  style={{ backgroundColor: qrBgColor }}
                >
                  <svg
                    width="200"
                    height="200"
                    viewBox={`0 0 ${qrMatrix.length} ${qrMatrix.length}`}
                    className="shape-rendering-crispEdges"
                  >
                    {qrMatrix.map((row, r) =>
                      row.map((cell, c) =>
                        cell ? (
                          <rect
                            key={`${r}-${c}`}
                            x={c}
                            y={r}
                            width="1"
                            height="1"
                            fill={qrFgColor}
                          />
                        ) : null
                      )
                    )}
                  </svg>
                </div>
                <span className="text-[11px] font-mono text-teal-300 mt-3">
                  Version 2 (25x25) · ISO/IEC 18004
                </span>
              </div>
            </div>
          ) : project.category === 'mau-tui-ban' ? (
            /* Color Palette Studio Simulator */
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-teal-200 mb-1">
                  Mẫu Bảng Màu Tương Tác: Emerald Abyss Spectrum
                </h3>
                <p className="text-xs text-slate-300">
                  Nhấp vào từng thanh màu bên dưới để copy mã HEX ngay lập tức:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { name: 'Cyan Spark', hex: '#14b8a6', role: 'Primary Accent' },
                  { name: 'Deep Jade', hex: '#0f766e', role: 'Secondary Accent' },
                  { name: 'Teal Twilight', hex: '#0c4a60', role: 'Surface Mid' },
                  { name: 'Ocean Midnight', hex: '#0b2545', role: 'Surface Deep' },
                  { name: 'Abyss Dark', hex: '#030a1c', role: 'Background Canvas' },
                ].map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => handleCopyColor(color.hex)}
                    className="p-3 rounded-xl border border-teal-500/20 text-left transition-all hover:scale-105 cursor-pointer group bg-slate-950/60"
                  >
                    <div
                      className="w-full h-16 rounded-lg mb-2 shadow-inner border border-white/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="font-mono text-xs font-bold text-white flex items-center justify-between">
                      <span>{color.hex}</span>
                      {copiedHex === color.hex ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500 group-hover:text-teal-300" />
                      )}
                    </div>
                    <span className="text-[11px] text-teal-200/80 block mt-0.5 truncate">
                      {color.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{color.role}</span>
                  </button>
                ))}
              </div>

              {/* Sample UI Mockup using these colors */}
              <div
                className="p-5 rounded-xl border border-teal-500/30 text-white"
                style={{
                  background: 'linear-gradient(135deg, #0c4a60 0%, #0b2545 100%)',
                }}
              >
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-teal-500/30">
                  <span className="text-xs font-bold text-teal-300">
                    Live UI Preview with Chosen Palette
                  </span>
                  <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded">
                    Contrast WCAG: AAA
                  </span>
                </div>
                <h4 className="text-base font-bold mb-1">
                  Giao diện mẫu ứng dụng màu sắc tối ưu
                </h4>
                <p className="text-xs text-slate-200 mb-3">
                  Đảm bảo độ tương phản cao, êm dịu thị giác trong môi trường ánh sáng yếu.
                </p>
                <button
                  onClick={() => onShowToast('Đã kích hoạt hành động mẫu')}
                  className="btn-emerald-custom px-3.5 py-1.5 text-xs font-bold cursor-pointer"
                >
                  Nút thử nghiệm
                </button>
              </div>
            </div>
          ) : (
            /* General Code / Architecture Preview Simulator */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-teal-300 font-mono">
                  <Code2 className="w-4 h-4 text-teal-400" />
                  <span>core/engine/{project.slug}.ts</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `// ${project.title} - Production Architecture\nexport const config = {\n  version: "${project.version}",\n  category: "${project.category}",\n  maxConcurrency: 1000,\n  cacheDuration: 3600\n};`
                    );
                    onShowToast('Đã copy cấu hình mẫu!');
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy code snippet</span>
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                <span className="text-teal-400">// Tối ưu hóa kiến trúc hiệu năng cao</span>
                <br />
                <span className="text-purple-400">import</span> &#123; createEngine &#125;{' '}
                <span className="text-purple-400">from</span>{' '}
                <span className="text-emerald-300">'@emerald/core'</span>;<br />
                <br />
                <span className="text-purple-400">export const</span>{' '}
                <span className="text-cyan-300">service</span> = createEngine(&#123;
                <br />
                &nbsp;&nbsp;id:{' '}
                <span className="text-emerald-300">"{project.id}"</span>,<br />
                &nbsp;&nbsp;release:{' '}
                <span className="text-emerald-300">"{project.releaseDate}"</span>,<br />
                &nbsp;&nbsp;mode:{' '}
                <span className="text-emerald-300">"zero-latency-production"</span>,<br />
                &nbsp;&nbsp;features: [<br />
                {project.features.map((f, i) => (
                  <span key={i}>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">"{f.title}"</span>
                    {i < project.features.length - 1 ? ',' : ''}
                    <br />
                  </span>
                ))}
                &nbsp;&nbsp;]<br />
                &#125;);
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Deep-Dive Case Study Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Left 2 columns: Story, Challenges, Solution, Features */}
        <div className="md:col-span-2 space-y-8">
          {/* Executive Overview */}
          <section className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6 sm:p-7 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-400" />
              Tổng Quan & Mục Tiêu Dự Án
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.fullDescription}
            </p>
          </section>

          {/* Challenges & Architectural Solution */}
          <section className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6 sm:p-7 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Thách Thức Kỹ Thuật & Giải Pháp
            </h3>
            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <span className="font-semibold text-rose-300 block mb-1">
                  Thách thức đặt ra:
                </span>
                <p className="text-slate-300">{project.challenges}</p>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="font-semibold text-teal-300 block mb-1">
                  Giải pháp triển khai:
                </span>
                <p className="text-slate-300">{project.solution}</p>
              </div>
            </div>
          </section>

          {/* Core Features Grid */}
          <section className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6 sm:p-7 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Các Tính Năng Trọng Tâm
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/60 border border-teal-500/15"
                >
                  <h4 className="font-bold text-sm text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-slate-300/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right 1 column: Tech Stack & Key Metrics */}
        <div className="space-y-6">
          {/* Tech Stack Breakdown */}
          <section className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              Công Nghệ Sử Dụng
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1 font-semibold">
                  Frontend
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.frontend.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-slate-950 border border-teal-500/20 text-teal-200 rounded font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.techStack.backend && project.techStack.backend.length > 0 && (
                <div>
                  <span className="text-slate-400 block mb-1 font-semibold">
                    Backend & API
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.backend.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-slate-950 border border-teal-500/20 text-cyan-200 rounded font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.techStack.database && project.techStack.database.length > 0 && (
                <div>
                  <span className="text-slate-400 block mb-1 font-semibold">
                    Cơ sở dữ liệu
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.database.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-slate-950 border border-teal-500/20 text-emerald-200 rounded font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-slate-400 block mb-1 font-semibold">
                  Công cụ & Triển khai
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.tooling.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-slate-950 border border-slate-700 text-slate-300 rounded font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Performance & Metrics Strip */}
          <section className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-400" />
              Chỉ Số Đo Lường
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950/70 border border-teal-500/20 rounded-xl text-center"
                >
                  <span className="block text-base sm:text-lg font-extrabold text-teal-200 font-mono">
                    {metric.value}
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* 5. Related Projects Section */}
      <section className="pt-8 border-t border-teal-500/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Các Dự Án Tiêu Biểu Khác</h3>
          <button
            onClick={onBack}
            className="text-xs text-teal-300 hover:text-white hover:underline cursor-pointer font-medium"
          >
            Xem toàn bộ kho dự án →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {relatedProjects.map((rel) => (
            <div
              key={rel.id}
              onClick={() => {
                onSelectProject(rel);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-teal-500/20 hover:border-teal-400 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] text-teal-400 font-semibold mb-1 block">
                  {rel.categoryLabel}
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-teal-200 transition-colors mb-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-slate-300/80 line-clamp-2 leading-relaxed mb-3">
                  {rel.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">{rel.releaseDate}</span>
                <span className="text-xs font-bold text-teal-300 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Xem ngay →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
