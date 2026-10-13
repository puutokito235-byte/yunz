import React, { useState } from 'react';
import {
  X,
  HardDrive,
  QrCode,
  Palette,
  Layers,
  Copy,
  Check,
  Download,
  Star,
  ExternalLink,
  Code2,
  FileCode,
  Terminal,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  COLOR_PALETTES,
  DRIVE_RESOURCES,
  SKILL_CATEGORIES,
  ColorPalette,
  DriveItem,
} from '../data/portfolioData';
import { generateQrMatrix } from '../utils/qrGenerator';

interface ThemeModalViewProps {
  theme: 'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill';
  onClose: () => void;
  onShowToast: (message: string) => void;
  onViewProjectByTheme: (category: string) => void;
}

export const ThemeModalView: React.FC<ThemeModalViewProps> = ({
  theme,
  onClose,
  onShowToast,
  onViewProjectByTheme,
}) => {
  // QR Studio states
  const [qrContent, setQrContent] = useState('https://emerald.dev');
  const [qrColor, setQrColor] = useState('#14b8a6');
  const [qrBg, setQrBg] = useState('#030a1c');
  const [qrPreset, setQrPreset] = useState<'url' | 'wifi' | 'text'>('url');

  // Palette states
  const [copiedColorHex, setCopiedColorHex] = useState<string | null>(null);

  // Drive states
  const [driveSearch, setDriveSearch] = useState('');

  // Skill filter
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('all');

  const qrMatrix = React.useMemo(() => {
    return generateQrMatrix(qrContent);
  }, [qrContent]);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColorHex(hex);
    onShowToast(`Đã sao chép mã màu: ${hex}`);
    setTimeout(() => setCopiedColorHex(null), 2000);
  };

  const handleCopyPaletteTokens = (palette: ColorPalette) => {
    const tokens = `/* ${palette.name} - Tailwind CSS Tokens */\n:root {\n${palette.colors
      .map((c) => `  --color-${c.name.toLowerCase().replace(/\s+/g, '-')}: ${c.hex};`)
      .join('\n')}\n}`;
    navigator.clipboard.writeText(tokens);
    onShowToast(`Đã copy toàn bộ mã CSS Variables của bộ màu ${palette.name}!`);
  };

  const filteredDrive = DRIVE_RESOURCES.filter(
    (item) =>
      item.title.toLowerCase().includes(driveSearch.toLowerCase()) ||
      (item.description?.toLowerCase().includes(driveSearch.toLowerCase()) ?? false) ||
      item.language.toLowerCase().includes(driveSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-teal-500/30 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-teal-500/20 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {theme === 'code-drive' && <HardDrive className="w-5 h-5" />}
              {theme === 'code-qr' && <QrCode className="w-5 h-5" />}
              {theme === 'mau-tui-ban' && <Palette className="w-5 h-5" />}
              {theme === 'skill' && <Layers className="w-5 h-5" />}
            </span>
            <div>
              <h3 className="text-lg font-bold text-white capitalize">
                {theme === 'code-drive' && 'Code Drive - Kho Lưu Trữ Tài Nguyên & Script'}
                {theme === 'code-qr' && 'Code QR Studio - Tạo Mã QR Vector Tức Thì'}
                {theme === 'mau-tui-ban' && 'Màu Tui Bán - Cửa Hàng Bảng Màu & Design Tokens'}
                {theme === 'skill' && 'Bản Đồ Kỹ Năng & Năng Lực Công Nghệ (Skills)'}
              </h3>
              <p className="text-xs text-teal-300/80">
                Không gian tương tác trực tiếp · Emerald Dev Studio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Đóng bảng tương tác"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* ================= CODE DRIVE THEME ================= */}
          {theme === 'code-drive' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-300 max-w-xl">
                  Tổng hợp các starter kit, snippet và framework templates phục vụ sản xuất thực tế. Tải về và tích hợp ngay vào dự án của bạn:
                </p>
                <div className="w-full sm:w-64">
                  <input
                    type="text"
                    value={driveSearch}
                    onChange={(e) => setDriveSearch(e.target.value)}
                    placeholder="Tìm kiếm tài nguyên..."
                    className="w-full bg-slate-950/80 border border-teal-500/30 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredDrive.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-slate-950/70 border border-teal-500/20 flex flex-col justify-between hover:border-teal-400/50 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-teal-400 font-mono mb-2">
                        <span className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5" />
                          {item.language}
                        </span>
                        <span>{item.size}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-3">{item.title}</h4>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        ⭐ {item.stars} · {item.downloads} lượt tải
                      </span>
                      <button
                        onClick={() =>
                          onShowToast(`Bắt đầu tải về gói mã: ${item.title}`)
                        }
                        className="btn-emerald-custom px-3 py-1.5 text-xs font-bold gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Tải tệp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= CODE QR THEME ================= */}
          {theme === 'code-qr' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {(['url', 'wifi', 'text'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setQrPreset(mode);
                        if (mode === 'url') setQrContent('https://emerald.dev');
                        if (mode === 'wifi') setQrContent('WIFI:S:MyEmeraldOffice;T:WPA;P:emerald2026;;');
                        if (mode === 'text') setQrContent('Xin chào từ KhoiDev Emerald Studio!');
                      }}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer capitalize ${
                        qrPreset === mode
                          ? 'bg-teal-400 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {mode === 'url' ? 'Liên kết URL' : mode === 'wifi' ? 'Wi-Fi' : 'Văn bản'}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nội dung mã hóa QR:
                  </label>
                  <textarea
                    rows={3}
                    value={qrContent}
                    onChange={(e) => setQrContent(e.target.value)}
                    className="w-full bg-slate-950/80 border border-teal-500/30 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-teal-400 font-mono"
                    placeholder="Nhập nội dung cần tạo mã QR..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Màu điểm (Foreground):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="w-8 h-8 rounded border border-teal-500/40 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-xs text-slate-300 uppercase">{qrColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Màu nền (Background):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={qrBg}
                        onChange={(e) => setQrBg(e.target.value)}
                        className="w-8 h-8 rounded border border-teal-500/40 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-xs text-slate-300 uppercase">{qrBg}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => onShowToast('Đã tải xuống mã QR dạng SVG thành công!')}
                    className="btn-emerald-custom px-4 py-2 text-xs font-bold gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải ảnh Vector SVG</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(qrContent);
                      onShowToast('Đã copy nội dung mã QR!');
                    }}
                    className="btn-contrast-custom px-3 py-2 text-xs font-bold gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy nội dung</span>
                  </button>
                </div>
              </div>

              {/* Live QR Output */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-teal-500/20">
                <div
                  className="p-5 rounded-2xl shadow-2xl transition-all"
                  style={{ backgroundColor: qrBg }}
                >
                  <svg
                    width="220"
                    height="220"
                    viewBox={`0 0 ${qrMatrix.length} ${qrMatrix.length}`}
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
                            fill={qrColor}
                          />
                        ) : null
                      )
                    )}
                  </svg>
                </div>
                <div className="text-center mt-3">
                  <span className="text-xs text-teal-300 font-mono block">
                    Độ phân giải Vector vô hạn
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Hỗ trợ quét tức thời mọi camera smartphone
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================= MÀU TUI BÁN THEME ================= */}
          {theme === 'mau-tui-ban' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-300 max-w-xl">
                  Bộ sưu tập bảng màu độc quyền tối ưu tỷ lệ tương phản WCAG 2.1 AA/AAA cho thiết kế sản phẩm số hiện đại:
                </p>
                <span className="text-xs text-teal-300 font-semibold font-mono">
                  {COLOR_PALETTES.length} Bảng màu tuyển chọn
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {COLOR_PALETTES.map((palette) => (
                  <div
                    key={palette.id}
                    className="p-5 rounded-2xl bg-slate-950/70 border border-teal-500/20 flex flex-col justify-between hover:border-teal-400/50 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-teal-300">{palette.theme}</span>
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                          {palette.price}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-white mb-2">{palette.name}</h4>
                      <p className="text-xs text-slate-300/80 leading-relaxed mb-4">
                        {palette.description}
                      </p>

                      {/* Color swatches */}
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        {palette.colors.map((color) => (
                          <button
                            key={color.hex}
                            onClick={() => handleCopyHex(color.hex)}
                            className="group relative cursor-pointer"
                            title={`Click để copy ${color.hex}`}
                          >
                            <div
                              className="h-12 rounded-lg border border-white/10 shadow-sm transition-transform group-hover:scale-105"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="font-mono text-[10px] text-slate-300 block text-center mt-1">
                              {color.hex}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                      <span className="text-[11px] text-slate-400">
                        ⭐ {palette.rating} ({palette.downloads} lượt tải)
                      </span>
                      <button
                        onClick={() => handleCopyPaletteTokens(palette)}
                        className="btn-emerald-custom px-3 py-1.5 text-xs font-bold gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Xuất CSS Tokens</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= SKILL THEME ================= */}
          {theme === 'skill' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-teal-500/20">
                <button
                  onClick={() => setActiveSkillCategory('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                    activeSkillCategory === 'all'
                      ? 'bg-teal-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Tất cả lĩnh vực
                </button>
                {SKILL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => setActiveSkillCategory(cat.category)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                      activeSkillCategory === cat.category
                        ? 'bg-teal-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {SKILL_CATEGORIES.filter(
                  (cat) =>
                    activeSkillCategory === 'all' || cat.category === activeSkillCategory
                ).map((cat) => (
                  <div
                    key={cat.category}
                    className="p-6 rounded-2xl bg-slate-950/60 border border-teal-500/20"
                  >
                    <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      {cat.title}
                    </h4>

                    <div className="space-y-4">
                      {cat.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{skill.name}</span>
                            <span className="font-mono text-teal-300 font-bold">
                              {skill.level}% · {skill.years}
                            </span>
                          </div>

                          {/* Level Progress Bar */}
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>

                          <p className="text-[11px] text-slate-400">{skill.highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="px-6 py-4 border-t border-teal-500/20 flex items-center justify-between bg-slate-950/80 shrink-0">
          <span className="text-xs text-slate-400">
            Xem thêm các dự án áp dụng trực tiếp chủ đề này
          </span>
          <button
            onClick={() => {
              onClose();
              onViewProjectByTheme(theme);
            }}
            className="btn-emerald-custom px-4 py-2 text-xs font-bold gap-2 cursor-pointer"
          >
            <span>Lọc dự án theo {theme}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
