/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProfileHero } from './components/ProfileHero';
import { ProjectDetailView } from './components/ProjectDetailView';
import { ThemePageView } from './components/ThemePageView';
import { Toast } from './components/Toast';
import { AdminAuthModal, ChangePinModal } from './components/AdminAuthModal';
import {
  TopProgressBar,
  AppInitializingSkeleton,
} from './components/LoadingSkeleton';
import { PROJECTS, Project } from './data/portfolioData';

export default function App() {
  const [isAppInitializing, setIsAppInitializing] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeThemePage, setActiveThemePage] = useState<
    'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill' | null
  >(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Subtle data & layout initialization
    const timer = setTimeout(() => {
      setIsAppInitializing(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // Security: Đối với người xem truy cập đường link, mặc định là FALSE (Chế độ người xem).
  // Chỉ khi chủ trang đã đăng nhập PIN thành công trên trình duyệt này thì mới là TRUE.
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('emerald_admin_session') === 'true';
  });

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);

  const handleAdminSuccess = () => {
    setIsAdmin(true);
    localStorage.setItem('emerald_admin_session', 'true');
    setIsAdminLoginOpen(false);
    showToast('👑 Đã xác thực thành công! Bạn đang ở Chế độ Quản trị (Chủ trang).');
  };

  const handleLockAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('emerald_admin_session');
    showToast('Đã khóa và chuyển về Chế độ Người xem (Khách). Nút quản trị đã được ẩn.');
  };

  // Sync with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === '#admin') {
        setIsAdminLoginOpen(true);
        history.replaceState(null, '', window.location.pathname + window.location.search);
        return;
      }

      if (hash.startsWith('#project-')) {
        const slug = hash.replace('#project-', '');
        const matched = PROJECTS.find((p) => p.slug === slug || p.id === slug);
        if (matched) {
          setSelectedProject(matched);
          setActiveThemePage(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } else if (hash.startsWith('#theme-')) {
        const theme = hash.replace('#theme-', '') as
          | 'code-drive'
          | 'code-qr'
          | 'mau-tui-ban'
          | 'skill';
        if (['code-drive', 'code-qr', 'mau-tui-ban', 'skill'].includes(theme)) {
          setActiveThemePage(theme);
          setSelectedProject(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      if (!hash) {
        setSelectedProject(null);
        setActiveThemePage(null);
      }
    };

    if (window.location.search.includes('admin=1') || window.location.search.includes('admin=true')) {
      setIsAdminLoginOpen(true);
    }

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenProjectDetail = (project: Project) => {
    setSelectedProject(project);
    setActiveThemePage(null);
    window.location.hash = `project-${project.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenThemePage = (
    theme: 'code-drive' | 'code-qr' | 'mau-tui-ban' | 'skill'
  ) => {
    setActiveThemePage(theme);
    setSelectedProject(null);
    window.location.hash = `theme-${theme}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedProject(null);
    setActiveThemePage(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  return (
    <div className="emerald-ocean-bg relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-teal-400 selection:text-slate-950">
      {/* Top progress indicator bar for global navigation/loading */}
      <TopProgressBar isLoading={isAppInitializing} />

      {/* Subtle background ambient texture */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[radial-gradient(#2dd4bf_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none"
      />

      {/* Main View:
          - Note: "Không có nút liên hệ hợp tác hay logo tên ở góc trái phía trên màn hình"
          - Therefore, top header bar is eliminated.
      */}
      <main className="flex-1 relative z-10">
        {isAppInitializing ? (
          /* Subtle skeleton screen during initial data and layout initialization */
          <AppInitializingSkeleton />
        ) : selectedProject ? (
          /* Dedicated Project Detail Page */
          <ProjectDetailView
            project={selectedProject}
            onBack={handleBackToHome}
            onSelectProject={handleOpenProjectDetail}
            allProjects={PROJECTS}
            onShowToast={showToast}
          />
        ) : activeThemePage ? (
          /* Dedicated Theme Page (Code drive, Code qr, Màu tui bán, Skill)
             Contains the search input: "Mục tìm kiếm nằm trong trang của mỗi nút chủ đề, không đặt trong trang chính."
          */
          <ThemePageView
            theme={activeThemePage}
            onBack={handleBackToHome}
            onSwitchTheme={handleOpenThemePage}
            onShowToast={showToast}
            isAdmin={isAdmin}
          />
        ) : (
          /* Main Home Page:
             User instruction: "Ở trang chính ngoài 4 nút chủ đề ra thì không còn gì khác"
             - Hình đại diện (tròn) đặt ở giữa ngay đầu trang
             - Tên đặt lên phía trên các thông tin liên hệ
             - Thông tin liên hệ cùng tông màu với các nút chủ đề (trắng nổi bật, đổ bóng)
             - Tiểu sử ngay sau đó
             - 4 Nút chủ đề xếp thành 1 cột hình chữ nhật bo góc đổ bóng bên phải
             - Ngoài 4 nút chủ đề ra thì không còn gì khác!
          */
          <div className="min-h-screen flex flex-col items-center justify-center py-6 sm:py-8">
            <ProfileHero
              onOpenThemePage={handleOpenThemePage}
              onShowToast={showToast}
              isAdmin={isAdmin}
              onLockAdmin={handleLockAdmin}
              onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
              onOpenChangePin={() => setIsChangePinOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Admin Authentication & Change PIN Modals */}
      <AdminAuthModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={handleAdminSuccess}
        onShowToast={showToast}
      />

      <ChangePinModal
        isOpen={isChangePinOpen}
        onClose={() => setIsChangePinOpen(false)}
        onShowToast={showToast}
      />

      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
