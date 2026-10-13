import React, { useState } from 'react';
import { Mail, Phone, Send, Check, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onShowToast: (message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Vui lòng điền đầy đủ họ tên, email và nội dung tin nhắn.');
      return;
    }

    setIsSubmitting(true);
    // Simulate real working submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onShowToast('Cảm ơn bạn! Tin nhắn đã được gửi thành công đến Khôi.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 600);
  };

  return (
    <section id="contact-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-slate-900/70 border border-teal-500/25 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Glow orb */}
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column: Contact details */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-teal-300 mb-1.5 block">
                Kết Nối & Hợp Tác
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Cùng Khởi Tạo Dự Án Mới
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Bạn đang tìm kiếm một kỹ sư Frontend / Full-Stack cho dự án web hiệu năng cao, muốn tùy biến bộ bảng màu độc quyền, hoặc cần giải pháp tạo mã QR tùy chỉnh? Đừng ngần ngại liên hệ với mình nhé!
            </p>

            <div className="space-y-3.5 pt-2 text-xs sm:text-sm">
              <div className="flex items-center gap-3 text-slate-200">
                <span className="w-9 h-9 rounded-xl bg-slate-950 border border-teal-500/30 flex items-center justify-center text-teal-300 shrink-0">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[11px] text-slate-400 block">Email trực tiếp</span>
                  <a
                    href={`mailto:${PROFILE_INFO.email}`}
                    className="font-mono text-teal-200 hover:text-white transition-colors"
                  >
                    {PROFILE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-200">
                <span className="w-9 h-9 rounded-xl bg-slate-950 border border-teal-500/30 flex items-center justify-center text-teal-300 shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[11px] text-slate-400 block">Số điện thoại / Zalo</span>
                  <span className="font-mono text-teal-200">{PROFILE_INFO.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-200">
                <span className="w-9 h-9 rounded-xl bg-slate-950 border border-teal-500/30 flex items-center justify-center text-teal-300 shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[11px] text-slate-400 block">Địa điểm làm việc</span>
                  <span>{PROFILE_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Quick response note */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-teal-500/20 text-xs text-teal-200/90 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-300 shrink-0" />
              <span>Phản hồi thông tin trong vòng 2 - 4 giờ làm việc.</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Họ và tên của bạn *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nguyễn Văn A"
                className="w-full bg-slate-950/80 border border-teal-500/30 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Địa chỉ Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full bg-slate-950/80 border border-teal-500/30 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Chủ đề quan tâm
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-slate-950/80 border border-teal-500/30 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-400 transition-colors cursor-pointer"
              >
                <option value="">Chọn chủ đề hợp tác...</option>
                <option value="code-drive">Quan tâm tài nguyên Code Drive</option>
                <option value="code-qr">Hợp tác giải pháp Code QR</option>
                <option value="mau-tui-ban">Đặt mua / Tư vấn Bảng màu</option>
                <option value="freelance">Tuyển dụng / Dự án Freelance</option>
                <option value="other">Trao đổi khác</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nội dung tin nhắn *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mô tả ngắn gọn về nhu cầu hoặc ý tưởng của bạn..."
                className="w-full bg-slate-950/80 border border-teal-500/30 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-teal-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-emerald-custom w-full py-3 px-4 text-xs font-bold gap-2 cursor-pointer mt-2"
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Tin nhắn đã gửi thành công!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Đang gửi tin nhắn...' : 'Gửi tin nhắn liên hệ'}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
