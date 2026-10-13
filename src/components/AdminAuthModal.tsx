import React, { useState } from 'react';
import { Lock, Key, X, ShieldCheck, AlertCircle, Check } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onShowToast: (message: string) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onShowToast,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPin = localStorage.getItem('emerald_admin_pin') || '1234';

    if (pinInput.trim() === savedPin) {
      setErrorMsg('');
      setPinInput('');
      onSuccess();
    } else {
      setErrorMsg('Mã PIN không chính xác! Vui lòng thử lại.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl text-left space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-teal-500/20">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-400" />
            <span>Xác Thực Chủ Trang (Admin)</span>
          </h3>
          <button
            onClick={() => {
              setErrorMsg('');
              setPinInput('');
              onClose();
            }}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Chỉ chủ sở hữu trang mới có quyền kích hoạt Chế độ Quản trị để chỉnh sửa, thêm mới hoặc xóa dữ liệu.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-teal-200 mb-1.5">
              Nhập mã PIN Quản trị viên:
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={12}
              autoFocus
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Nhập mã PIN..."
              className="w-full bg-slate-950 border border-teal-500/40 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400 tracking-widest text-center font-mono placeholder:text-slate-500 placeholder:tracking-normal"
            />
            {errorMsg && (
              <div className="flex items-center gap-1.5 text-rose-400 text-xs mt-2 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-teal-500/15 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1 text-teal-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Gợi ý bảo mật:</span>
            </div>
            <p>Mã PIN mặc định ban đầu là: <span className="font-mono text-white font-bold">1234</span></p>
            <p>Sau khi mở quyền Admin, bạn có thể đổi mã PIN bất kỳ lúc nào.</p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setPinInput('');
                onClose();
              }}
              className="btn-contrast-custom px-4 py-2 text-xs font-bold cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn-emerald-custom px-5 py-2 text-xs font-bold gap-1.5 cursor-pointer shadow-md"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Xác nhận mở Admin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ChangePinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const ChangePinModal: React.FC<ChangePinModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPin = localStorage.getItem('emerald_admin_pin') || '1234';

    if (currentPin.trim() !== savedPin) {
      setErrorMsg('Mã PIN hiện tại không đúng!');
      return;
    }

    if (newPin.trim().length < 4) {
      setErrorMsg('Mã PIN mới phải có ít nhất 4 ký tự!');
      return;
    }

    if (newPin.trim() !== confirmPin.trim()) {
      setErrorMsg('Mã PIN mới xác nhận không khớp!');
      return;
    }

    localStorage.setItem('emerald_admin_pin', newPin.trim());
    onShowToast('Đã đổi mã PIN Quản trị viên thành công!');
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-teal-500/40 rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl text-left space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-teal-500/20">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-teal-400" />
            <span>Đổi Mã PIN Quản Trị</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSavePin} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-teal-200 mb-1">Mã PIN hiện tại:</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={12}
              required
              value={currentPin}
              onChange={(e) => {
                setCurrentPin(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="PIN hiện tại..."
              className="w-full bg-slate-950 border border-teal-500/40 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-teal-400 font-mono tracking-widest text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-teal-200 mb-1">Mã PIN mới (tối thiểu 4 số):</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={12}
              required
              value={newPin}
              onChange={(e) => {
                setNewPin(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="PIN mới..."
              className="w-full bg-slate-950 border border-teal-500/40 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-teal-400 font-mono tracking-widest text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-teal-200 mb-1">Nhập lại mã PIN mới:</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={12}
              required
              value={confirmPin}
              onChange={(e) => {
                setConfirmPin(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Nhập lại PIN mới..."
              className="w-full bg-slate-950 border border-teal-500/40 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-teal-400 font-mono tracking-widest text-center"
            />
          </div>

          {errorMsg && (
            <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-contrast-custom px-4 py-2 text-xs font-bold cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn-emerald-custom px-5 py-2 text-xs font-bold gap-1.5 cursor-pointer shadow-md"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Lưu mã PIN</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
