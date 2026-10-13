import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  X,
  HardDrive,
  QrCode,
  Palette,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Edit3,
  Plus,
  ExternalLink,
  Download,
  Copy,
  Check,
  RotateCcw,
  Layers,
  Trash2,
  ShieldAlert,
  Upload,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import {
  INITIAL_DRIVE_RESOURCES,
  SKILL_VIDEOS,
  COLOR_ITEMS_1X1,
  DriveItem,
  SkillVideo,
  ColorItem1x1,
} from '../data/portfolioData';
import { generateQrMatrix } from '../utils/qrGenerator';
import {
  TopProgressBar,
  ThemePageSkeleton,
  SubtleSpinnerBadge,
} from './LoadingSkeleton';

interface ThemePageViewProps {
  theme: 'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill';
  onBack: () => void;
  onSwitchTheme?: (theme: 'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill') => void;
  onShowToast: (message: string) => void;
  isAdmin: boolean;
}

export const ThemePageView: React.FC<ThemePageViewProps> = ({
  theme,
  onBack,
  onSwitchTheme,
  onShowToast,
  isAdmin,
}) => {
  // Navigation & initialization subtle loading state
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 380);
    return () => clearTimeout(timer);
  }, [theme]);

  // Theme-specific search query
  const [searchQuery, setSearchQuery] = useState('');

  // ==========================================
  // STATE CHO CODE DRIVE (Chỉ Owner có thể sửa, người dùng chỉ đọc)
  // ==========================================
  const [driveItems, setDriveItems] = useState<DriveItem[]>(() => {
    const saved = localStorage.getItem('emerald_drive_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DRIVE_RESOURCES;
      }
    }
    return INITIAL_DRIVE_RESOURCES;
  });

  const [editingItem, setEditingItem] = useState<DriveItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const driveFileInputRef = useRef<HTMLInputElement>(null);

  const handleDriveAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      onShowToast('Kích thước ảnh tối đa 8MB. Vui lòng chọn ảnh nhỏ hơn.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (editingItem) {
        setEditingItem({ ...editingItem, avatarUrl: dataUrl });
      }
      onShowToast('Đã tải ảnh đại diện từ album thành công!');
    };
    reader.readAsDataURL(file);
  };

  const saveDriveItems = (newItems: DriveItem[]) => {
    setDriveItems(newItems);
    localStorage.setItem('emerald_drive_items', JSON.stringify(newItems));
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isAddingNew) {
      const updated = [editingItem, ...driveItems];
      saveDriveItems(updated);
      onShowToast(`Đã thêm mới code: ${editingItem.title}`);
    } else {
      const updated = driveItems.map((item) =>
        item.id === editingItem.id ? editingItem : item
      );
      saveDriveItems(updated);
      onShowToast(`Đã cập nhật thông tin và liên kết cho: ${editingItem.title}`);
    }
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleDeleteDriveItem = (id: string) => {
    const updated = driveItems.filter((i) => i.id !== id);
    saveDriveItems(updated);
    onShowToast('Đã xóa mục code.');
  };

  // ==========================================
  // STATE CHO SKILL (Video 9:16 - Owner có thể thêm/xóa video)
  // ==========================================
  const [videos, setVideos] = useState<SkillVideo[]>(() => {
    const saved = localStorage.getItem('emerald_skill_videos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return SKILL_VIDEOS;
      }
    }
    return SKILL_VIDEOS;
  });

  const [activePlayingVideoId, setActivePlayingVideoId] = useState<string | null>('vid-1');
  const [fullscreenVideo, setFullscreenVideo] = useState<SkillVideo | null>(null);
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [newVideo, setNewVideo] = useState<Partial<SkillVideo>>({
    title: '',
    badge: 'Chuyển cảnh',
    duration: '0:15',
    views: '10.5k',
    gradientTheme: 'from-emerald-400 via-teal-600 to-slate-950',
    animationPattern: 'zoom',
    accentColor: '#14b8a6',
  });

  const saveVideos = (newVids: SkillVideo[]) => {
    setVideos(newVids);
    localStorage.setItem('emerald_skill_videos', JSON.stringify(newVids));
  };

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.title) return;
    const created: SkillVideo = {
      id: `vid-${Date.now()}`,
      title: newVideo.title,
      badge: newVideo.badge || 'Chuyển cảnh',
      duration: newVideo.duration || '0:15',
      views: newVideo.views || '1.2k',
      gradientTheme: newVideo.gradientTheme || 'from-emerald-400 via-teal-600 to-slate-950',
      animationPattern: (newVideo.animationPattern as any) || 'zoom',
      accentColor: newVideo.accentColor || '#14b8a6',
    };
    const updated = [created, ...videos];
    saveVideos(updated);
    setIsAddingVideo(false);
    onShowToast(`Đã tải lên video 9:16 mới: ${created.title}`);
  };

  const handleDeleteVideo = (id: string) => {
    const updated = videos.filter((v) => v.id !== id);
    saveVideos(updated);
    onShowToast('Đã xóa video.');
  };

  // ==========================================
  // STATE CHO CODE QR (Kèm video mẫu 9:16 + code ở góc dưới bên phải)
  // Không có màu điểm QR và màu nền QR theo yêu cầu người dùng
  // ==========================================
  const [qrText, setQrText] = useState('https://emerald.dev');
  const qrFgColor = '#030a1c';
  const qrBgColor = '#ffffff';
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const qrMatrix = useMemo(() => {
    return generateQrMatrix(qrText);
  }, [qrText]);

  // ==========================================
  // STATE CHO MÀU TUI BÁN (ẢNH 1:1 do tôi up lên, thay đổi giá tùy ý, không có mô tả hay tiêu đề)
  // ==========================================
  const [colorItems, setColorItems] = useState<ColorItem1x1[]>(() => {
    const saved = localStorage.getItem('emerald_color_items');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0].imageUrl === 'string') {
          return parsed;
        }
      } catch (e) {
        return COLOR_ITEMS_1X1;
      }
    }
    return COLOR_ITEMS_1X1;
  });

  const [isAddingColor, setIsAddingColor] = useState(false);
  const [newColorPrice, setNewColorPrice] = useState('49.000 đ');
  const [newColorImageUrl, setNewColorImageUrl] = useState('');
  const [editingColorItem, setEditingColorItem] = useState<ColorItem1x1 | null>(null);
  const [previewColorItem, setPreviewColorItem] = useState<ColorItem1x1 | null>(null);
  const colorFileInputRef = useRef<HTMLInputElement>(null);
  const editColorFileInputRef = useRef<HTMLInputElement>(null);

  const saveColorItems = (items: ColorItem1x1[]) => {
    setColorItems(items);
    localStorage.setItem('emerald_color_items', JSON.stringify(items));
  };

  const handleColorFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      onShowToast('Kích thước ảnh tối đa 8MB. Vui lòng chọn ảnh nhỏ hơn.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (isEditing && editingColorItem) {
        setEditingColorItem({ ...editingColorItem, imageUrl: dataUrl });
      } else {
        setNewColorImageUrl(dataUrl);
      }
      onShowToast('Đã tải ảnh lên thành công!');
    };
    reader.readAsDataURL(file);
  };

  const handleCreateColorItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColorImageUrl.trim()) {
      onShowToast('Vui lòng chọn ảnh từ thiết bị hoặc dán đường dẫn ảnh!');
      return;
    }
    const created: ColorItem1x1 = {
      id: `color-${Date.now()}`,
      imageUrl: newColorImageUrl.trim(),
      price: newColorPrice.trim() || 'Liên hệ',
    };
    saveColorItems([created, ...colorItems]);
    setIsAddingColor(false);
    setNewColorImageUrl('');
    setNewColorPrice('49.000 đ');
    onShowToast(`Đã tải lên ảnh màu mới với giá: ${created.price}`);
  };

  const handleSaveEditedColorItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingColorItem) return;
    const updated = colorItems.map((item) =>
      item.id === editingColorItem.id ? editingColorItem : item
    );
    saveColorItems(updated);
    setEditingColorItem(null);
    onShowToast(`Đã cập nhật giá mới: ${editingColorItem.price}`);
  };

  const handleDeleteColorItem = (id: string) => {
    const updated = colorItems.filter((c) => c.id !== id);
    saveColorItems(updated);
    onShowToast('Đã xóa mục ảnh màu.');
  };

  // Filtered lists by search query
  const filteredDrive = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return driveItems;
    return driveItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description?.toLowerCase().includes(q) ?? false) ||
        item.language.toLowerCase().includes(q)
    );
  }, [driveItems, searchQuery]);

  const filteredVideos = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return videos;
    return videos.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.badge.toLowerCase().includes(q)
    );
  }, [videos, searchQuery]);

  const filteredColorItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return colorItems;
    return colorItems.filter((c) =>
      c.price.toLowerCase().includes(q)
    );
  }, [colorItems, searchQuery]);

  const getThemeMeta = () => {
    switch (theme) {
      case 'code-drive':
        return {
          title: 'Code Drive',
          subtitle: 'Kho lưu trữ code: ảnh đại diện bên trái, liên kết và chi tiết',
          icon: HardDrive,
          placeholder: 'Tìm kiếm code, liên kết, ngôn ngữ...',
        };
      case 'code-qr':
        return {
          title: 'Code QR Studio',
          subtitle: 'Video mẫu 9:16 kèm mã QR tích hợp trực tiếp tại góc dưới bên phải',
          icon: QrCode,
          placeholder: 'Tìm kiếm hoặc nhập nội dung mã QR...',
        };
      case 'mau-tui-ban':
        return {
          title: 'Màu Tui Bán',
          subtitle: 'Bộ sưu tập ảnh màu định dạng 1:1 với giá niêm yết',
          icon: Palette,
          placeholder: 'Tìm kiếm theo giá...',
        };
      case 'skill':
        return {
          title: 'Skill - Video Showcase',
          subtitle: 'Bộ sưu tập video 9:16 trình diễn Chuyển cảnh, Intro, Outro & Visual FX',
          icon: Layers,
          placeholder: 'Tìm kiếm video (Chuyển cảnh, Intro, Outro...)...',
        };
    }
  };

  const themeMeta = getThemeMeta();
  const ThemeIcon = themeMeta.icon;

  const ALL_THEMES: Array<{
    id: 'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill';
    label: string;
    icon: React.ElementType;
  }> = [
    { id: 'code-drive', label: 'Code Drive', icon: HardDrive },
    { id: 'code-qr', label: 'Code QR', icon: QrCode },
    { id: 'mau-tui-ban', label: 'Màu Tui Bán', icon: Palette },
    { id: 'skill', label: 'Skill Video', icon: Layers },
  ];

  return (
    <div className="py-6 sm:py-8 px-3.5 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Subtle top indicator bar */}
      <TopProgressBar isLoading={isPageLoading} />

      {/* 1. NÚT QUAY LẠI TRANG CHÍNH & TRẠNG THÁI QUYỀN HẠN */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
        <button
          onClick={onBack}
          className="btn-emerald-custom px-3.5 sm:px-4 py-2 text-xs font-bold gap-2 cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trang chính</span>
        </button>

        <div className="flex items-center gap-2">
          {isAdmin ? (
            <span className="tag-shadow-item px-2.5 py-1 text-[11px] font-mono text-emerald-900">
              Quyền Chủ Trang (Admin)
            </span>
          ) : (
            <span className="tag-shadow-item px-2.5 py-1 text-[11px] font-mono text-slate-800">
              Chế độ Người xem
            </span>
          )}
        </div>
      </div>

      {/* THANH ĐIỀU HƯỚNG NHANH GIỮA CÁC TRANG CHỦ ĐỀ */}
      {onSwitchTheme && (
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-teal-200/80 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            Chuyển nhanh chủ đề:
          </span>
          {ALL_THEMES.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === theme;
            return (
              <button
                key={t.id}
                onClick={() => {
                  if (t.id !== theme) {
                    onSwitchTheme(t.id);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-white text-teal-950 shadow-md ring-2 ring-teal-400 scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-teal-500/25'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-700' : 'text-teal-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* SKELETON SCREEN KHI ĐANG ĐIỀU HƯỚNG HOẶC KHỞI TẠO DỮ LIỆU */}
      {isPageLoading ? (
        <ThemePageSkeleton theme={theme} />
      ) : (
        <div className="animate-fade-in">
          {/* 2. TIÊU ĐỀ CHỦ ĐỀ & MỤC TÌM KIẾM */}
          <div className="bg-slate-900/80 border border-teal-500/30 rounded-3xl p-5 sm:p-7 mb-7 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-16 w-60 h-60 bg-teal-400/15 rounded-full blur-3xl pointer-events-none"
            />

            <div className="flex items-center gap-3.5 sm:gap-4 mb-3.5">
              <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shadow-lg shrink-0">
            <ThemeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {themeMeta.title}
            </h1>
            <p className="text-xs sm:text-sm text-teal-200/90 font-medium">
              {themeMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Mục tìm kiếm nhanh */}
        <div className="mt-4 pt-4 border-t border-teal-500/20">
          <div className="relative flex items-center max-w-xl">
            <Search className="w-4 h-4 text-teal-300 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={themeMeta.placeholder}
              className="w-full bg-slate-950/80 border border-teal-400/40 text-white placeholder-slate-400 text-xs sm:text-sm rounded-xl pl-10 pr-9 py-2.5 focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-400/25 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. NỘI DUNG CHUYÊN BIỆT TỪNG TRANG */}

      {/* ========================================================================= */}
      {/* 1. TRANG "SKILL" - CÁC VIDEO 9:16 (CHUYỂN CẢNH, INTRO, OUTRO...) */}
      {/* ========================================================================= */}
      {theme === 'skill' && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              <span>Danh Sách Video 9:16 ({filteredVideos.length})</span>
            </h2>

            {/* Chỉ Chủ Trang (Admin) mới có nút đăng tải video mới */}
            {isAdmin && (
              <button
                onClick={() => setIsAddingVideo(true)}
                className="btn-emerald-custom px-3.5 py-1.5 text-xs font-bold gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Đăng tải video 9:16 mới</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredVideos.map((video) => {
              const isPlaying = activePlayingVideoId === video.id;

              return (
                <div
                  key={video.id}
                  className="bg-slate-900/80 border border-teal-500/25 hover:border-teal-400/60 rounded-3xl p-3.5 sm:p-4 shadow-xl flex flex-col justify-between transition-all group"
                >
                  {/* Khung Video 9:16 */}
                  <div
                    onClick={() => setActivePlayingVideoId(isPlaying ? null : video.id)}
                    className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-inner flex flex-col justify-between p-3.5 cursor-pointer group-hover:shadow-2xl transition-all"
                  >
                    {/* Animated Video Simulation Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${video.gradientTheme} opacity-85 transition-transform duration-700 ${
                        isPlaying ? 'scale-105' : 'scale-100'
                      }`}
                    />

                    {/* Scanlines / Particle wave */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] animate-pulse pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:100%_4px] opacity-40 pointer-events-none" />

                    {/* Top Video Header with Box-Shadow Tags */}
                    <div className="relative z-10 flex items-center justify-between">
                      {/* Tag có màu trắng/ngọc nhẹ và ĐỔ BÓNG */}
                      <span className="tag-shadow-item px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                        {video.badge}
                      </span>
                      <span className="tag-shadow-item px-2 py-0.5 text-[10px] font-mono">
                        {video.duration}
                      </span>
                    </div>

                    {/* Center Animated Visual Indicator */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
                      <button
                        type="button"
                        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110 mb-2 cursor-pointer"
                        aria-label={isPlaying ? 'Tạm dừng video' : 'Phát video'}
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 fill-white" />
                        ) : (
                          <Play className="w-6 h-6 fill-white translate-x-0.5" />
                        )}
                      </button>
                      <span className="text-xs text-white/90 font-medium drop-shadow-md">
                        {isPlaying ? 'Đang phát mẫu 9:16' : 'Chạm để phát thử'}
                      </span>
                    </div>

                    {/* Bottom Video Info */}
                    <div className="relative z-10 bg-slate-950/75 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      <h3 className="font-bold text-white text-xs sm:text-sm line-clamp-1">
                        {video.title}
                      </h3>
                      <div className="flex items-center justify-between mt-1 text-[11px] text-teal-300 font-mono">
                        <span>{video.views} lượt xem</span>
                        <span className="tag-shadow-item px-1.5 py-0.2 text-[9px]">9:16 HD</span>
                      </div>
                    </div>
                  </div>

                  {/* Tiêu đề & Hành động dưới khung video */}
                  <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-teal-200 truncate">
                      {video.title}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteVideo(video.id)}
                          className="p-1 rounded-md text-rose-400 hover:text-rose-200 bg-slate-950/60 border border-rose-500/30 cursor-pointer"
                          title="Xóa video (Chỉ chủ trang)"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                      <button
                        onClick={() => setFullscreenVideo(video)}
                        className="btn-emerald-custom px-3 py-1 text-xs font-bold cursor-pointer"
                      >
                        <span>Xem lớn</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal đăng tải video mới (chỉ Admin) */}
          {isAddingVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-teal-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-teal-500/20">
                  <h3 className="font-extrabold text-base text-white">Đăng Tải Video 9:16 Mới</h3>
                  <button onClick={() => setIsAddingVideo(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateVideo} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-teal-200 mb-1">Tiêu đề video:</label>
                    <input
                      type="text"
                      required
                      placeholder="Chuyển cảnh / Intro / Outro..."
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                      className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-teal-200 mb-1">Tag hiển thị:</label>
                      <input
                        type="text"
                        value={newVideo.badge}
                        onChange={(e) => setNewVideo({ ...newVideo, badge: e.target.value })}
                        placeholder="Chuyển cảnh"
                        className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-teal-200 mb-1">Thời lượng:</label>
                      <input
                        type="text"
                        value={newVideo.duration}
                        onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                        placeholder="0:15"
                        className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddingVideo(false)}
                      className="btn-contrast-custom px-3 py-1.5 text-xs font-bold cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="btn-emerald-custom px-4 py-1.5 text-xs font-bold cursor-pointer"
                    >
                      Đăng video
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal xem lớn video 9:16 */}
          {fullscreenVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
              <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-3xl overflow-hidden bg-slate-950 border-2 border-teal-400 shadow-2xl flex flex-col justify-between p-5">
                <div className={`absolute inset-0 bg-gradient-to-b ${fullscreenVideo.gradientTheme} opacity-90`} />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="tag-shadow-item px-2.5 py-1 text-xs font-bold uppercase">
                    {fullscreenVideo.badge} · 9:16
                  </span>
                  <button
                    onClick={() => setFullscreenVideo(null)}
                    className="p-1.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative z-10 text-center my-auto">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white mx-auto shadow-2xl mb-3">
                    <Play className="w-8 h-8 fill-white translate-x-0.5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white drop-shadow-md">
                    {fullscreenVideo.title}
                  </h3>
                  <p className="text-xs text-teal-200 mt-1">Video mẫu 9:16 Full HD</p>
                </div>

                <div className="relative z-10 bg-slate-950/85 p-3.5 rounded-2xl border border-white/10 text-center">
                  <button
                    onClick={() => {
                      onShowToast(`Đã chọn hiệu ứng: ${fullscreenVideo.title}`);
                      setFullscreenVideo(null);
                    }}
                    className="btn-emerald-custom w-full py-2.5 text-xs font-bold cursor-pointer"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. TRANG "CODE DRIVE" - TAG MÀU TRẮNG/NGỌC NHẸ ĐỔ BÓNG, CHỈ TÔI MỚI SỬA ĐƯỢC */}
      {/* ========================================================================= */}
      {theme === 'code-drive' && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-teal-400" />
              <span>Kho Tài Nguyên Code Drive ({filteredDrive.length})</span>
            </h2>

            {/* Chỉ Owner (Admin) mới có nút thêm code */}
            {isAdmin && (
              <button
                onClick={() => {
                  setEditingItem({
                    id: `drive-${Date.now()}`,
                    title: '',
                    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
                    link: 'https://drive.google.com/drive/folders/my-code',
                    type: 'template',
                    size: '2.5 MB',
                    stars: 120,
                    downloads: 650,
                    description: '',
                    language: 'TypeScript / React',
                    updatedAt: 'Hôm nay',
                  });
                  setIsAddingNew(true);
                }}
                className="btn-emerald-custom px-3.5 py-1.5 text-xs font-bold gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm code mới (Chủ trang)</span>
              </button>
            )}
          </div>

          <p className="text-xs text-slate-300">
            Mỗi mục có ảnh đại diện bên trái và nút mở tài nguyên code.
            {!isAdmin && (
              <span className="text-teal-300 ml-1">
                (Nội dung do chủ trang đăng tải và quản lý, người xem không thể chỉnh sửa).
              </span>
            )}
          </p>

          {/* Danh sách mục Code Drive */}
          <div className="grid grid-cols-1 gap-4">
            {filteredDrive.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/80 border border-teal-500/25 hover:border-teal-400/50 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
              >
                {/* Bên trái: Ảnh đại diện + Thông tin */}
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 w-full">
                  {/* Ảnh đại diện bên trái */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-950 border border-teal-400/40 shrink-0 shadow-md">
                    <img
                      src={item.avatarUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    {/* Tag ngôn ngữ trên ảnh: màu trắng ngả ngọc nhẹ CÓ ĐỔ BÓNG */}
                    <div className="absolute inset-x-1 bottom-1 text-center">
                      <span className="tag-shadow-item px-1.5 py-0.5 text-[9px] font-mono font-bold truncate max-w-full">
                        {item.language}
                      </span>
                    </div>
                  </div>

                  {/* Thông tin của code */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {/* USER REQUIREMENT: Màu của mỗi tag là màu trắng hoặc hơi ngả xanh ngọc một chút, CÓ ĐỔ BÓNG */}
                      <span className="tag-shadow-item px-2 py-0.5 text-[10px] font-mono">
                        {item.size}
                      </span>
                      <span className="tag-shadow-item px-2 py-0.5 text-[10px]">
                        {item.updatedAt}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-white truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  {/* CHỈ CHỦ TRANG (ADMIN) MỚI ĐƯỢC PHÉP SỬA & XÓA */}
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => handleDeleteDriveItem(item.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:text-white bg-slate-950/60 border border-rose-500/30 cursor-pointer"
                        title="Xóa mục này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setIsAddingNew(false);
                        }}
                        className="btn-contrast-custom px-3 py-1.5 text-xs font-bold gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Sửa</span>
                      </button>
                    </>
                  )}

                  {/* Nút mở liên kết cho tất cả người xem */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-emerald-custom px-3.5 py-1.5 text-xs font-bold gap-1 cursor-pointer"
                  >
                    <span>Mở link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Modal chỉnh sửa liên kết, ảnh đại diện và thông tin code (Chỉ Owner mở được) */}
          {editingItem && isAdmin && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-teal-500/20">
                  <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-teal-400" />
                    <span>{isAddingNew ? 'Thêm Code Mới' : 'Tùy Chỉnh Thông Tin & Liên Kết'}</span>
                  </h3>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleUpdateItem} className="space-y-4">
                  {/* Ảnh đại diện bên trái: tải lên từ album hoặc dán liên kết */}
                  <div>
                    <label className="block text-xs font-bold text-teal-200 mb-1.5">
                      Ảnh đại diện bên trái (Tải lên từ album ảnh hoặc dán URL):
                    </label>
                    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/70 border border-teal-500/20">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border-2 border-teal-400 shrink-0 shadow-md">
                        <img
                          src={editingItem.avatarUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <input
                          type="file"
                          ref={driveFileInputRef}
                          accept="image/*"
                          onChange={handleDriveAvatarFileUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => driveFileInputRef.current?.click()}
                          className="btn-emerald-custom w-full py-2 px-3 text-xs font-bold gap-1.5 cursor-pointer shadow-md"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Tải ảnh lên từ album / thiết bị</span>
                        </button>
                        <input
                          type="text"
                          value={editingItem.avatarUrl}
                          onChange={(e) =>
                            setEditingItem({ ...editingItem, avatarUrl: e.target.value })
                          }
                          placeholder="Hoặc dán URL ảnh tại đây..."
                          className="w-full bg-slate-900 border border-teal-500/30 text-white rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-teal-400 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-teal-200 mb-1">
                      Liên kết chia sẻ (Drive / GitHub / Download):
                    </label>
                    <input
                      type="url"
                      required
                      value={editingItem.link}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, link: e.target.value })
                      }
                      placeholder="https://drive.google.com/..."
                      className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-teal-200 mb-1">Tiêu đề code:</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, title: e.target.value })
                      }
                      placeholder="Tên gói code, template..."
                      className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-teal-200 mb-1">Ngôn ngữ:</label>
                      <input
                        type="text"
                        value={editingItem.language}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, language: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-teal-200 mb-1">Dung lượng:</label>
                      <input
                        type="text"
                        value={editingItem.size}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, size: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="btn-contrast-custom px-4 py-2 text-xs font-bold cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="btn-emerald-custom px-5 py-2 text-xs font-bold cursor-pointer"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. TRANG "CODE QR" - KÈM VIDEO MẪU 9:16 VÀ CODE Ở GÓC DƯỚI BÊN PHẢI */}
      {/* ========================================================================= */}
      {theme === 'code-qr' && (
        <section className="space-y-6">
          <div className="bg-slate-900/80 border border-teal-500/30 rounded-3xl p-5 sm:p-7 backdrop-blur-md shadow-2xl">
            <h2 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-cyan-400" />
              <span>Video Mẫu 9:16 Tích Hợp QR Code Ở Góc Dưới Bên Phải</span>
            </h2>
            <p className="text-xs text-slate-300 mb-6">
              Mã QR luôn được nhúng trực tiếp tại <span className="text-teal-300 font-bold">góc dưới bên phải của video 9:16</span>.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start">
              {/* KHUNG VIDEO MẪU 9:16 CÓ QR CODE Ở GÓC DƯỚI BÊN PHẢI */}
              <div className="lg:col-span-6 flex flex-col items-center w-full">
                <div className="relative w-full max-w-[300px] sm:max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden bg-slate-950 border-2 border-teal-400/60 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between p-4 group">
                  {/* Dynamic Gradient Animation */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-b from-teal-400 via-emerald-700 to-slate-950 opacity-90 transition-all duration-1000 ${
                      isVideoPlaying ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.25),transparent_70%)] animate-pulse pointer-events-none" />

                  {/* Top Bar of Video with Box-Shadow Tags */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="tag-shadow-item px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                      Video Mẫu 9:16
                    </span>

                    <button
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      className="p-1.5 rounded-full bg-slate-950/80 text-teal-300 hover:text-white cursor-pointer shadow-md"
                    >
                      {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Center Play Indicator */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    <button
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110 cursor-pointer mb-2"
                      aria-label="Phát / Dừng video mẫu"
                    >
                      {isVideoPlaying ? (
                        <Pause className="w-6 h-6 fill-white" />
                      ) : (
                        <Play className="w-6 h-6 fill-white translate-x-0.5" />
                      )}
                    </button>
                    <span className="text-xs text-white drop-shadow-md font-medium">
                      {isVideoPlaying ? 'Video đang chạy mô phỏng' : 'Chạm để tiếp tục'}
                    </span>
                  </div>

                  {/* ============================================================== */}
                  {/* YÊU CẦU: CODE Ở NGAY GÓC DƯỚI BÊN PHẢI CỦA VIDEO 9:16 */}
                  {/* ============================================================== */}
                  <div className="absolute bottom-4 right-4 z-20 bg-slate-950/90 backdrop-blur-md p-2 rounded-2xl border-2 border-teal-400 shadow-[0_8px_25px_rgba(0,0,0,0.85)] transition-all transform hover:scale-110">
                    <div
                      className="p-1.5 rounded-xl transition-all"
                      style={{ backgroundColor: qrBgColor }}
                    >
                      <svg
                        width="84"
                        height="84"
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
                    <div className="text-center mt-1">
                      <span className="tag-shadow-item px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider">
                        Scan QR
                      </span>
                    </div>
                  </div>

                  {/* Bottom Left Video Caption */}
                  <div className="relative z-10 max-w-[160px] bg-slate-950/70 backdrop-blur-md p-2 rounded-xl border border-white/10">
                    <span className="text-[11px] font-bold text-white block">
                      Quét mã góc phải
                    </span>
                    <span className="text-[10px] text-teal-300 block truncate">
                      {qrText}
                    </span>
                  </div>
                </div>

                <span className="tag-shadow-item mt-3 px-3 py-1 text-[11px] font-mono">
                  Tỷ lệ 9:16 · QR Code ở góc dưới bên phải
                </span>
              </div>

              {/* BỘ ĐIỀU KHIỂN QR CODE (KHÔNG CÓ MÀU ĐIỂM VÀ MÀU NỀN) */}
              <div className="lg:col-span-6 space-y-4 w-full">
                <h3 className="font-bold text-base text-white">
                  Tùy biến nội dung mã QR trên video 9:16
                </h3>

                <div>
                  <label className="block text-xs font-bold text-teal-200 mb-1.5">
                    Nội dung mã QR:
                  </label>
                  <textarea
                    rows={4}
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    className="w-full bg-slate-950/80 border border-teal-500/30 text-white rounded-xl p-3.5 text-xs sm:text-sm focus:outline-none focus:border-teal-400 font-mono shadow-inner leading-relaxed"
                    placeholder="Nhập liên kết, tài khoản, số điện thoại..."
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-teal-500/20 text-xs text-slate-300">
                  Mã QR được tự động tối ưu hóa chuẩn tỷ lệ tương phản ISO/IEC 18004 để camera quét nhanh và chính xác nhất từ khung video 9:16.
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => onShowToast('Đã tải xuống mã QR định dạng SVG!')}
                    className="btn-emerald-custom px-4 py-2 text-xs font-bold gap-2 cursor-pointer shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải ảnh QR SVG</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(qrText);
                      onShowToast('Đã sao chép nội dung mã QR!');
                    }}
                    className="btn-contrast-custom px-3.5 py-2 text-xs font-bold gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. TRANG "MÀU TUI BÁN" - ẢNH 1:1 DO TÔI UP LÊN, GIÁ Ở GIỮA BÊN DƯỚI, THAY ĐỔI GIÁ TÙY Ý */}
      {/* ========================================================================= */}
      {theme === 'mau-tui-ban' && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-emerald-400" />
              <span>Bộ Sưu Tập Ảnh Màu 1:1 ({filteredColorItems.length})</span>
            </h2>

            {/* Chỉ Chủ Trang (Admin) mới có quyền đăng tải ảnh màu mới */}
            {isAdmin && (
              <button
                onClick={() => {
                  setNewColorImageUrl('');
                  setNewColorPrice('49.000 đ');
                  setIsAddingColor(true);
                }}
                className="btn-emerald-custom px-3.5 py-1.5 text-xs font-bold gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Đăng tải ảnh màu mới (Chủ trang)</span>
              </button>
            )}
          </div>

          <p className="text-xs text-slate-300">
            Tất cả là ảnh định dạng 1:1 thực tế, ở giữa ngay bên dưới là giá niêm yết.
            {isAdmin && (
              <span className="text-teal-300 ml-1">
                (Chủ trang có thể nhấp trực tiếp vào giá hoặc nút sửa để thay đổi giá của mọi màu tùy ý).
              </span>
            )}
          </p>

          {/* LƯỚI ẢNH 1:1, Ở GIỮA NGAY BÊN DƯỚI LÀ GIÁ, KHÔNG CÓ TIÊU ĐỀ/MÔ TẢ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5 sm:gap-7">
            {filteredColorItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center group relative"
              >
                {/* ẢNH ĐỊNH DẠNG 1:1 DO TÔI UP LÊN */}
                <div
                  onClick={() => setPreviewColorItem(item)}
                  className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl border border-teal-400/30 group-hover:border-teal-300 group-hover:shadow-[0_12px_28px_rgba(20,184,166,0.35)] transition-all duration-300 group-hover:scale-[1.03] cursor-pointer bg-slate-950"
                  title="Nhấp để xem ảnh lớn"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.price}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80';
                    }}
                  />

                  {/* Nút thao tác của Chủ trang trên ảnh (Sửa giá / Xóa) */}
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingColorItem(item);
                        }}
                        className="p-1.5 rounded-lg bg-slate-950/85 hover:bg-slate-900 text-teal-300 hover:text-white border border-teal-400/50 shadow-md cursor-pointer transition-transform hover:scale-110"
                        title="Đổi giá hoặc đổi ảnh"
                        aria-label="Đổi giá hoặc đổi ảnh"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteColorItem(item.id);
                        }}
                        className="p-1.5 rounded-lg bg-slate-950/85 hover:bg-slate-900 text-rose-400 hover:text-white border border-rose-500/50 shadow-md cursor-pointer transition-transform hover:scale-110"
                        title="Xóa ảnh này"
                        aria-label="Xóa ảnh này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Ở GIỮA NGAY BÊN DƯỚI LÀ GIÁ, KHÔNG CÓ MÔ TẢ HAY TIÊU ĐỀ */}
                {/* Chủ trang có thể nhấp thẳng vào giá để thay đổi tùy ý */}
                <div className="mt-3 text-center">
                  {isAdmin ? (
                    <button
                      type="button"
                      onClick={() => setEditingColorItem(item)}
                      className="tag-shadow-item px-3 py-1 font-extrabold text-xs sm:text-sm font-mono tracking-tight cursor-pointer hover:scale-105 group/price"
                      title="Nhấp để thay đổi giá tùy ý"
                    >
                      <span>{item.price}</span>
                      <Edit3 className="w-3 h-3 ml-1.5 text-teal-700 inline opacity-60 group-hover/price:opacity-100 transition-opacity" />
                    </button>
                  ) : (
                    <span className="tag-shadow-item px-3 py-1 font-extrabold text-xs sm:text-sm font-mono tracking-tight">
                      {item.price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Modal ĐĂNG TẢI ẢNH MÀU MỚI (Chỉ Chủ trang) */}
          {isAddingColor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-teal-500/20">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-teal-400" />
                    <span>Đăng Tải Ảnh Màu 1:1 Mới</span>
                  </h3>
                  <button
                    onClick={() => setIsAddingColor(false)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateColorItem} className="space-y-4">
                  {/* Xem trước ảnh 1:1 */}
                  {newColorImageUrl && (
                    <div className="flex flex-col items-center">
                      <div className="w-40 h-40 aspect-square rounded-2xl overflow-hidden border-2 border-teal-400 shadow-xl bg-slate-950">
                        <img
                          src={newColorImageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] text-teal-300 font-mono mt-1.5">
                        Ảnh xem trước tỷ lệ 1:1
                      </span>
                    </div>
                  )}

                  {/* Cách 1: Tải ảnh từ album ảnh hoặc thiết bị */}
                  <div>
                    <label className="block text-xs font-bold text-teal-200 mb-1.5">
                      1. Chọn ảnh từ album ảnh / thiết bị của bạn:
                    </label>
                    <input
                      type="file"
                      ref={colorFileInputRef}
                      accept="image/*"
                      onChange={(e) => handleColorFileUpload(e, false)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => colorFileInputRef.current?.click()}
                      className="btn-emerald-custom w-full py-2.5 px-4 text-xs font-bold gap-2 cursor-pointer shadow-md"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Chọn ảnh từ album / thiết bị</span>
                    </button>
                  </div>

                  {/* Cách 2: Dán đường dẫn URL ảnh trực tiếp */}
                  <div className="pt-2 border-t border-slate-800">
                    <label className="block text-xs font-bold text-teal-200 mb-1.5">
                      2. Hoặc dán liên kết URL ảnh:
                    </label>
                    <input
                      type="url"
                      value={newColorImageUrl}
                      onChange={(e) => setNewColorImageUrl(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-400 font-mono"
                    />
                  </div>

                  {/* Giá bán tùy ý */}
                  <div className="pt-2 border-t border-slate-800">
                    <label className="block text-xs font-bold text-teal-200 mb-1.5">
                      Giá của màu này (Tùy ý bạn nhập):
                    </label>
                    <input
                      type="text"
                      required
                      value={newColorPrice}
                      onChange={(e) => setNewColorPrice(e.target.value)}
                      placeholder="49.000 đ, 99.000 đ, Miễn phí, Liên hệ..."
                      className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-400 font-mono"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddingColor(false)}
                      className="btn-contrast-custom px-4 py-2 text-xs font-bold cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="btn-emerald-custom px-5 py-2 text-xs font-bold cursor-pointer"
                    >
                      Đăng tải ảnh màu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal THAY ĐỔI GIÁ HOẶC ẢNH (Chủ trang có thể sửa mọi màu tùy ý) */}
          {editingColorItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-teal-500/20">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-teal-400" />
                    <span>Thay Đổi Giá Của Màu</span>
                  </h3>
                  <button
                    onClick={() => setEditingColorItem(null)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveEditedColorItem} className="space-y-4">
                  {/* Ảnh 1:1 hiện tại */}
                  <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-950/70 border border-teal-500/20">
                    <div className="w-20 h-20 aspect-square rounded-xl overflow-hidden border border-teal-400 shrink-0 bg-slate-900 shadow-md">
                      <img
                        src={editingColorItem.imageUrl}
                        alt="Current"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-white block">Ảnh màu 1:1</span>
                      <span className="text-[11px] text-teal-300 font-mono block mt-0.5">
                        Giá hiện tại: {editingColorItem.price}
                      </span>
                      <input
                        type="file"
                        ref={editColorFileInputRef}
                        accept="image/*"
                        onChange={(e) => handleColorFileUpload(e, true)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => editColorFileInputRef.current?.click()}
                        className="text-[11px] text-teal-300 hover:underline font-semibold mt-1 flex items-center gap-1 cursor-pointer"
                      >
                        <Camera className="w-3 h-3" />
                        <span>Chọn ảnh khác từ album</span>
                      </button>
                    </div>
                  </div>

                  {/* THAY ĐỔI GIÁ TÙY Ý */}
                  <div>
                    <label className="block text-xs font-bold text-teal-200 mb-1.5">
                      Nhập giá mới (Tùy ý bạn thay đổi):
                    </label>
                    <input
                      type="text"
                      required
                      value={editingColorItem.price}
                      onChange={(e) =>
                        setEditingColorItem({ ...editingColorItem, price: e.target.value })
                      }
                      placeholder="Nhập giá mới: 50.000 đ, 100.000 đ, Miễn phí..."
                      className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-400 font-mono font-bold"
                    />
                  </div>

                  {/* Thay đổi URL ảnh nếu muốn */}
                  <div className="pt-2 border-t border-slate-800">
                    <label className="block text-xs font-bold text-teal-200 mb-1.5">
                      Hoặc dán link ảnh mới:
                    </label>
                    <input
                      type="url"
                      value={editingColorItem.imageUrl}
                      onChange={(e) =>
                        setEditingColorItem({ ...editingColorItem, imageUrl: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-teal-400 font-mono"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteColorItem(editingColorItem.id);
                        setEditingColorItem(null);
                      }}
                      className="text-xs text-rose-400 hover:text-rose-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa mục này</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingColorItem(null)}
                        className="btn-contrast-custom px-3.5 py-1.5 text-xs font-bold cursor-pointer"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="btn-emerald-custom px-4 py-1.5 text-xs font-bold cursor-pointer"
                      >
                        Lưu giá mới
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal XEM LỚN ẢNH 1:1 */}
          {previewColorItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
              <div className="relative w-full max-w-sm flex flex-col items-center">
                <button
                  onClick={() => setPreviewColorItem(null)}
                  className="absolute -top-10 right-0 p-1.5 rounded-full bg-slate-900/90 text-white hover:bg-slate-800 cursor-pointer shadow-lg"
                  title="Đóng"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* ẢNH 1:1 TOÀN BẢN */}
                <div className="w-full aspect-square rounded-3xl overflow-hidden border-2 border-teal-400 shadow-2xl bg-slate-950">
                  <img
                    src={previewColorItem.imageUrl}
                    alt={previewColorItem.price}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Ở GIỮA NGAY BÊN DƯỚI LÀ GIÁ */}
                <div className="mt-4 text-center">
                  <span className="tag-shadow-item px-4 py-1.5 font-extrabold text-sm sm:text-base font-mono tracking-tight">
                    {previewColorItem.price}
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
        </div>
      )}
    </div>
  );
};
