import React, { useState, useRef } from 'react';
import {
  Github,
  Mail,
  Phone,
  HardDrive,
  QrCode,
  Palette,
  Layers,
  ChevronRight,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  Edit2,
  Camera,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  X,
  Check,
  Sparkles,
} from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { FacebookIcon, TikTokIcon, ZaloIcon } from './SocialIcons';

interface ProfileHeroProps {
  onOpenThemePage: (theme: 'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill') => void;
  onShowToast: (message: string) => void;
  isAdmin: boolean;
  onLockAdmin: () => void;
  onOpenAdminLogin: () => void;
  onOpenChangePin: () => void;
}

const PRESET_AVATARS = [
  {
    name: 'Chân dung Studio',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Lập trình viên Hiện đại',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Phong cách Tối giản',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Công nghệ Cyber',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
  },
];

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  onOpenThemePage,
  onShowToast,
  isAdmin,
  onLockAdmin,
  onOpenAdminLogin,
  onOpenChangePin,
}) => {
  // Editable profile state for the owner
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('emerald_profile_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return PROFILE_INFO;
      }
    }
    return PROFILE_INFO;
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  // Avatar changing states
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  const [customAvatarUrlInput, setCustomAvatarUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveProfileToStorage = (updatedProfile: typeof profile) => {
    setProfile(updatedProfile);
    setTempProfile(updatedProfile);
    localStorage.setItem('emerald_profile_info', JSON.stringify(updatedProfile));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfileToStorage(tempProfile);
    setIsEditingProfile(false);
    onShowToast('Đã lưu thông tin hồ sơ của bạn thành công!');
  };

  // Upload file avatar from computer or mobile phone
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 6 * 1024 * 1024) {
      onShowToast('Kích thước ảnh tối đa 6MB. Vui lòng chọn ảnh nhỏ hơn.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const updated = { ...profile, avatarUrl: dataUrl };
      saveProfileToStorage(updated);
      setIsChangingAvatar(false);
      onShowToast('Đã tải lên ảnh đại diện từ album thành công!');
    };
    reader.readAsDataURL(file);
  };

  // Apply custom URL input
  const handleApplyAvatarUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAvatarUrlInput.trim()) return;
    const updated = { ...profile, avatarUrl: customAvatarUrlInput.trim() };
    saveProfileToStorage(updated);
    setCustomAvatarUrlInput('');
    setIsChangingAvatar(false);
    onShowToast('Đã cập nhật ảnh đại diện từ liên kết!');
  };

  // Apply preset avatar
  const handleApplyPreset = (url: string) => {
    const updated = { ...profile, avatarUrl: url };
    saveProfileToStorage(updated);
    setIsChangingAvatar(false);
    onShowToast('Đã áp dụng ảnh đại diện mẫu!');
  };

  // Reset to default vector avatar
  const handleResetDefaultAvatar = () => {
    const updated = { ...profile, avatarUrl: '' };
    saveProfileToStorage(updated);
    setIsChangingAvatar(false);
    onShowToast('Đã khôi phục ảnh đại diện vẽ vector mặc định!');
  };

  const themeButtons = [
    {
      id: 'code-drive' as const,
      label: 'Code drive',
      subtext: 'Kho lưu trữ mã nguồn, snippets & starter templates',
      icon: HardDrive,
      color: 'text-teal-600',
    },
    {
      id: 'code-qr' as const,
      label: 'Code qr',
      subtext: 'Trình tạo mã QR Vector SVG tùy biến thời gian thực',
      icon: QrCode,
      color: 'text-cyan-600',
    },
    {
      id: 'mau-tui-ban' as const,
      label: 'Màu tui bán',
      subtext: 'Bộ sưu tập ảnh 1:1 độc quyền & bảng giá tùy chỉnh',
      icon: Palette,
      color: 'text-emerald-600',
    },
    {
      id: 'skill' as const,
      label: 'Skill',
      subtext: 'Video 9:16 Chuyển cảnh, Intro, Outro & Visual FX',
      icon: Layers,
      color: 'text-sky-600',
    },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    onShowToast(`Đã sao chép email: ${profile.email}`);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    onShowToast(`Đã sao chép số điện thoại: ${profile.phone}`);
  };

  const avatarTapCountRef = useRef(0);
  const avatarTapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAvatarClick = () => {
    if (isAdmin) {
      setIsChangingAvatar(true);
      return;
    }
    // Subtle owner access: 3 quick taps on avatar opens PIN login prompt
    avatarTapCountRef.current += 1;
    if (avatarTapTimeoutRef.current) clearTimeout(avatarTapTimeoutRef.current);
    if (avatarTapCountRef.current >= 3) {
      avatarTapCountRef.current = 0;
      onOpenAdminLogin();
    } else {
      avatarTapTimeoutRef.current = setTimeout(() => {
        avatarTapCountRef.current = 0;
      }, 1000);
    }
  };

  return (
    <section className="relative w-full max-w-lg mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center flex flex-col items-center">
      {/* Background ambient teal blur */}
      <div
        aria-hidden="true"
        className="absolute top-20 left-1/2 -translate-x-1/2 w-72 sm:w-80 h-72 sm:h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* 1. HÌNH ĐẠI DIỆN (TRÒN) ĐẶT Ở GIỮA NGAY ĐẦU TRANG */}
      <div className="relative inline-block mb-3 group">
        <div
          onClick={handleAvatarClick}
          className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-teal-400 via-emerald-300 to-cyan-400 shadow-[0_0_28px_rgba(20,184,166,0.5)] transition-transform duration-300 ${
            isAdmin ? 'group-hover:scale-105 cursor-pointer' : ''
          }`}
          title={isAdmin ? "Nhấp để thay đổi ảnh đại diện của bạn" : profile.name}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleAvatarClick();
            }
          }}
          aria-label={isAdmin ? "Nhấp để thay đổi ảnh đại diện" : profile.name}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-950 flex items-center justify-center relative">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
                onError={() => {
                  onShowToast('Ảnh đại diện không tải được, hiển thị avatar mặc định.');
                  handleResetDefaultAvatar();
                }}
              />
            ) : (
              /* Custom stylized Developer Portrait SVG */
              <svg
                className="w-full h-full object-cover"
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="avatarBg" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0f172a" />
                    <stop offset="0.6" stopColor="#0d3b4a" />
                    <stop offset="1" stopColor="#0f766e" />
                  </linearGradient>
                </defs>
                <rect width="160" height="160" fill="url(#avatarBg)" />
                <path d="M20 120 C 40 100, 60 110, 80 90" stroke="rgba(45, 212, 191, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M140 130 C 120 110, 100 120, 80 90" stroke="rgba(45, 212, 191, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path
                  d="M32 160 C 32 128, 55 116, 80 116 C 105 116, 128 128, 128 160 Z"
                  fill="#0b233a"
                  stroke="#14b8a6"
                  strokeWidth="1.5"
                />
                <path d="M68 118 L80 132 L92 118" stroke="#2dd4bf" strokeWidth="2" fill="none" />
                <circle cx="80" cy="72" r="32" fill="#1e293b" stroke="#2dd4bf" strokeWidth="2" />
                <rect x="58" y="66" width="18" height="11" rx="3" fill="#0f172a" stroke="#5eead4" strokeWidth="1.8" />
                <rect x="84" y="66" width="18" height="11" rx="3" fill="#0f172a" stroke="#5eead4" strokeWidth="1.8" />
                <line x1="76" y1="71" x2="84" y2="71" stroke="#5eead4" strokeWidth="1.8" />
                <path
                  d="M50 68 C 50 44, 62 34, 80 34 C 98 34, 110 44, 110 68 C 104 60, 94 56, 80 56 C 66 56, 56 60, 50 68 Z"
                  fill="#0f766e"
                />
                <path d="M73 88 Q 80 93 87 88" stroke="#5eead4" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              </svg>
            )}
          </div>
        </div>

        {/* Nút camera thay đổi ảnh đại diện (Chỉ hiển thị cho Chủ trang) */}
        {isAdmin && (
          <button
            onClick={() => setIsChangingAvatar(true)}
            className="absolute bottom-1 right-1 p-2 rounded-full bg-white text-teal-950 shadow-xl border-2 border-teal-300 hover:scale-110 hover:bg-teal-50 transition-all cursor-pointer"
            title="Nhấp để thay đổi ảnh đại diện của bạn"
            aria-label="Thay đổi ảnh đại diện"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 2. THAY ĐỔI ĐỂ TÊN LÊN PHÍA TRÊN CÁC THÔNG TIN LIÊN HỆ (ĐÃ LOẠI BỎ CHỨC DANH/NGHỀ NGHIỆP) */}
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
            {profile.name}
          </h1>
          {isAdmin && (
            <button
              onClick={() => {
                setTempProfile(profile);
                setIsEditingProfile(true);
              }}
              className="p-1.5 rounded-full text-teal-200 hover:text-white bg-slate-900/70 border border-teal-400/40 hover:border-teal-300 hover:bg-slate-800 transition-all cursor-pointer shadow-md"
              title="Chỉnh sửa thông tin liên hệ và hồ sơ của bạn"
              aria-label="Chỉnh sửa thông tin liên hệ và hồ sơ"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. THÔNG TIN LIÊN HỆ NẰM DƯỚI TÊN:
          Tách nền, giữ lại viền màu trắng hơi ngả xanh, có đổ bóng.
          YÊU CẦU: Nếu thông tin nào không có liên kết hoặc không nhập gì thì không hiện biểu tượng!
      */}
      {((profile.facebook && profile.facebook.trim() !== '') ||
        (profile.tiktok && profile.tiktok.trim() !== '') ||
        (profile.github && profile.github.trim() !== '') ||
        (profile.zalo && profile.zalo.trim() !== '') ||
        (profile.email && profile.email.trim() !== '') ||
        (profile.phone && profile.phone.trim() !== '') ||
        isAdmin) && (
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-4">
          {/* Facebook */}
          {profile.facebook && profile.facebook.trim() !== '' && (
            <a
              href={profile.facebook.trim()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="contact-icon-theme-tone w-10 h-10 sm:w-11 sm:h-11 cursor-pointer"
              title="Facebook"
            >
              <FacebookIcon className="w-4.5 h-4.5" />
            </a>
          )}

          {/* TikTok */}
          {profile.tiktok && profile.tiktok.trim() !== '' && (
            <a
              href={profile.tiktok.trim()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="contact-icon-theme-tone w-10 h-10 sm:w-11 sm:h-11 cursor-pointer"
              title="TikTok"
            >
              <TikTokIcon className="w-4.5 h-4.5" />
            </a>
          )}

          {/* GitHub */}
          {profile.github && profile.github.trim() !== '' && (
            <a
              href={profile.github.trim()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="contact-icon-theme-tone w-10 h-10 sm:w-11 sm:h-11 cursor-pointer"
              title="GitHub"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
          )}

          {/* Zalo */}
          {profile.zalo && profile.zalo.trim() !== '' && (
            <a
              href={
                profile.zalo.trim().startsWith('http')
                  ? profile.zalo.trim()
                  : `https://zalo.me/${profile.zalo.trim().replace(/\s+/g, '')}`
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
              className="contact-icon-theme-tone w-10 h-10 sm:w-11 sm:h-11 cursor-pointer"
              title="Zalo"
            >
              <ZaloIcon className="w-4.5 h-4.5" />
            </a>
          )}

          {/* Email */}
          {profile.email && profile.email.trim() !== '' && (
            <button
              onClick={handleCopyEmail}
              aria-label="Sao chép Email"
              className="contact-icon-theme-tone w-10 h-10 sm:w-11 sm:h-11 cursor-pointer"
              title={`Copy Email: ${profile.email}`}
            >
              <Mail className="w-4.5 h-4.5" />
            </button>
          )}

          {/* Phone */}
          {profile.phone && profile.phone.trim() !== '' && (
            <button
              onClick={handleCopyPhone}
              aria-label="Sao chép Số điện thoại"
              className="contact-icon-theme-tone w-10 h-10 sm:w-11 sm:h-11 cursor-pointer"
              title={`Copy Phone: ${profile.phone}`}
            >
              <Phone className="w-4.5 h-4.5" />
            </button>
          )}

          {/* Nút sửa nhanh thông tin liên hệ khi Admin bật */}
          {isAdmin && (
            <button
              onClick={() => {
                setTempProfile(profile);
                setIsEditingProfile(true);
              }}
              className="contact-icon-theme-tone w-10 h-10 sm:w-11 sm:h-11 cursor-pointer"
              title="Chỉnh sửa các liên kết liên hệ (Chủ trang)"
              aria-label="Sửa thông tin liên hệ"
            >
              <Edit2 className="w-4 h-4 text-teal-300" />
            </button>
          )}
        </div>
      )}

      {/* 4. TIỂU SỬ NGAY DƯỚI CÁC BIỂU TƯỢNG LIÊN HỆ */}
      {profile.bio && profile.bio.trim() !== '' && (
        <div className="max-w-md mx-auto mb-6 px-2">
          <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-sans">
            {profile.bio}
          </p>
        </div>
      )}

      {/* 5. CÁC NÚT CHỦ ĐỀ (XẾP THÀNH 1 CỘT, HÌNH CHỮ NHẬT BO GÓC, ĐỔ BÓNG BÊN PHẢI) */}
      <div className="w-full flex flex-col gap-3.5 mb-6">
        {themeButtons.map((btn) => {
          const Icon = btn.icon;

          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => onOpenThemePage(btn.id)}
              className="btn-theme-column-item w-full py-4 px-5 cursor-pointer text-left group"
            >
              <div className="flex items-center gap-3.5 truncate">
                <span className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="truncate text-left">
                  <span className="font-extrabold text-base tracking-tight block text-slate-900 group-hover:text-teal-700 transition-colors">
                    {btn.label}
                  </span>
                  <span className="text-xs text-slate-500 font-normal truncate block mt-0.5">
                    {btn.subtext}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center pl-2">
                <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-teal-500 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors shadow-sm">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 6. CHẾ ĐỘ QUẢN TRỊ (CHỈ HIỂN THỊ KHI CHỦ TRANG ĐANG BẬT ADMIN - ĐỐI VỚI NGƯỜI XEM TUYỆT ĐỐI KHÔNG HIỂN THỊ) */}
      {isAdmin && (
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 animate-in fade-in duration-200">
          <div className="tag-shadow-item px-3 py-1.5 text-[11px] font-semibold flex items-center gap-1.5 text-emerald-800">
            <Unlock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Chế độ Quản trị: Đang bật</span>
          </div>

          <button
            onClick={onLockAdmin}
            className="px-3 py-1.5 text-[11px] font-semibold rounded-xl bg-slate-900/90 text-rose-300 hover:text-white border border-rose-500/30 shadow-md cursor-pointer hover:bg-rose-950/60 transition-colors flex items-center gap-1"
            title="Khóa lại và chuyển về Chế độ Người xem (nút này sẽ ẩn đi)"
          >
            <Lock className="w-3 h-3" />
            <span>Khóa / Về Người xem</span>
          </button>

          <button
            onClick={onOpenChangePin}
            className="px-3 py-1.5 text-[11px] font-semibold rounded-xl bg-slate-900/90 text-teal-300 hover:text-white border border-teal-500/30 shadow-md cursor-pointer hover:bg-teal-950/60 transition-colors flex items-center gap-1"
            title="Đổi mã PIN Quản trị"
          >
            <Key className="w-3 h-3" />
            <span>Đổi PIN</span>
          </button>
        </div>
      )}

      {/* Lối vào kín đáo chỉ dành cho chủ sở hữu để mở modal nhập mã PIN khi cần */}
      {!isAdmin && (
        <div className="mt-8 text-center opacity-25 hover:opacity-80 transition-opacity">
          <button
            onClick={onOpenAdminLogin}
            className="text-[10px] text-slate-500 hover:text-teal-300 transition-colors cursor-pointer px-2 py-1"
            title="Cổng truy cập Chủ trang"
            aria-label="Cổng truy cập Chủ trang"
          >
            <Lock className="w-2.5 h-2.5 inline-block mr-1 opacity-50" />
            <span className="font-mono text-[9px]">Admin Portal</span>
          </button>
        </div>
      )}

      {/* MODAL 1: THAY ĐỔI ẢNH ĐẠI DIỆN DÀNH CHO BẠN */}
      {isChangingAvatar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-teal-500/20">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-teal-400" />
                <span>Thay Đổi Ảnh Đại Diện</span>
              </h3>
              <button
                onClick={() => setIsChangingAvatar(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Xem trước ảnh hiện tại */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-950/70 border border-teal-500/20">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-900 border-2 border-teal-400 shrink-0 shadow-md">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-mono text-teal-300">
                    Vector
                  </div>
                )}
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Ảnh đại diện hiện tại</span>
                <span className="text-slate-400 block mt-0.5">
                  {profile.avatarUrl ? 'Đang dùng ảnh tùy chỉnh' : 'Đang dùng avatar vẽ mặc định'}
                </span>
                {profile.avatarUrl && (
                  <button
                    onClick={handleResetDefaultAvatar}
                    className="text-teal-400 hover:underline text-[11px] font-semibold mt-1 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Khôi phục avatar vẽ mặc định</span>
                  </button>
                )}
              </div>
            </div>

            {/* CÁCH 1: Tải ảnh từ album ảnh hoặc thiết bị */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-teal-200">
                1. Tải ảnh từ album ảnh hoặc thiết bị của bạn:
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleAvatarFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-emerald-custom w-full py-2.5 px-4 text-xs font-bold gap-2 cursor-pointer shadow-md"
              >
                <Upload className="w-4 h-4" />
                <span>Chọn ảnh từ album / thư viện ảnh</span>
              </button>
            </div>

            {/* CÁCH 2: Dán đường dẫn URL ảnh trực tiếp */}
            <form onSubmit={handleApplyAvatarUrl} className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-bold text-teal-200">
                2. Hoặc dán đường dẫn URL ảnh trực tiếp:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={customAvatarUrlInput}
                  onChange={(e) => setCustomAvatarUrlInput(e.target.value)}
                  placeholder="https://example.com/my-photo.jpg"
                  className="flex-1 bg-slate-950 border border-teal-500/30 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-teal-400 font-mono"
                />
                <button
                  type="submit"
                  className="btn-contrast-custom px-3 py-2 text-xs font-bold cursor-pointer shrink-0"
                >
                  Áp dụng
                </button>
              </div>
            </form>

            {/* CÁCH 3: Chọn từ các ảnh mẫu có sẵn */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-bold text-teal-200">
                3. Hoặc chọn nhanh từ mẫu ảnh phong cách:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_AVATARS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset.url)}
                    className="group flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-teal-400/40 group-hover:border-teal-300 group-hover:scale-105 transition-transform shadow-md">
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] text-slate-300 truncate max-w-full group-hover:text-teal-200">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-end border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsChangingAvatar(false)}
                className="btn-contrast-custom px-4 py-1.5 text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CHỈNH SỬA THÔNG TIN HỒ SƠ (Chỉ khi Admin bật) */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-teal-500/20">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Chỉnh Sửa Hồ Sơ Chủ Trang</span>
              </h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              {/* Ảnh đại diện trong form sửa hồ sơ */}
              <div>
                <label className="block text-xs font-bold text-teal-200 mb-1">Ảnh đại diện:</label>
                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-950/70 border border-teal-500/20">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-950 border-2 border-teal-400 shrink-0 shadow-md">
                    {tempProfile.avatarUrl ? (
                      <img src={tempProfile.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-teal-300">
                        Vector
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-emerald-custom w-full py-1.5 px-3 text-xs font-bold gap-1.5 cursor-pointer shadow-md"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Chọn ảnh từ album</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingProfile(false);
                        setIsChangingAvatar(true);
                      }}
                      className="text-[11px] text-teal-300 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Camera className="w-3 h-3" />
                      <span>Mẫu có sẵn / Nhập link ảnh</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-200 mb-1">Họ và tên:</label>
                <input
                  type="text"
                  required
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-200 mb-1">Tiểu sử giới thiệu:</label>
                <textarea
                  rows={2}
                  value={tempProfile.bio}
                  onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                  placeholder="Mô tả ngắn gọn về bản thân (để trống nếu không muốn hiện)..."
                  className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-teal-400 resize-none"
                />
              </div>

              {/* TÙY CHỈNH CÁC THÔNG TIN LIÊN HỆ */}
              <div className="pt-2 border-t border-slate-800 space-y-2.5">
                <div>
                  <span className="block text-xs font-bold text-teal-300 uppercase tracking-wider">
                    Chỉnh sửa các liên kết & thông tin liên hệ:
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">
                    (Mục nào để trống hoặc không nhập liên kết sẽ tự động ẩn biểu tượng trên trang chính)
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">Link Facebook:</label>
                  <input
                    type="url"
                    value={tempProfile.facebook || ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, facebook: e.target.value })}
                    placeholder="https://facebook.com/..."
                    className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-2.5 py-1.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">Link TikTok:</label>
                  <input
                    type="url"
                    value={tempProfile.tiktok || ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, tiktok: e.target.value })}
                    placeholder="https://tiktok.com/@..."
                    className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-2.5 py-1.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">Link GitHub:</label>
                  <input
                    type="url"
                    value={tempProfile.github || ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-2.5 py-1.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">Link Zalo (hoặc SĐT Zalo):</label>
                  <input
                    type="text"
                    value={tempProfile.zalo || ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, zalo: e.target.value })}
                    placeholder="https://zalo.me/... hoặc 0988123456"
                    className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-2.5 py-1.5 text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">Email:</label>
                    <input
                      type="email"
                      value={tempProfile.email || ''}
                      onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">Số điện thoại:</label>
                    <input
                      type="text"
                      value={tempProfile.phone || ''}
                      onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                      placeholder="0988 123 456"
                      className="w-full bg-slate-950 border border-teal-500/30 text-white rounded-lg px-2.5 py-1.5 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="btn-contrast-custom px-3 py-1.5 text-xs font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-emerald-custom px-4 py-1.5 text-xs font-bold cursor-pointer"
                >
                  Lưu hồ sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
