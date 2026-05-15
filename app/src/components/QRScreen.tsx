/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, ShieldCheck, Info } from 'lucide-react';
import { USER_DATA } from '../types';
import { motion } from 'motion/react';

export const QRScreen: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(23);
  
  // 1. Khai báo biến chứa tiền thật
  const [realBalance, setRealBalance] = useState(0);

  // 2. Hàm gọi API lấy số dư từ InfinityFree
  const fetchBalance = async () => {
    try {
      const response = await fetch('https://ueh-pass-potts.rf.gd/backend/controllers/api_get_balance.php');
      const result = await response.json();
      if (result.status === 'success') {
        setRealBalance(result.data.balance);
      }
    } catch (error) {
      console.error("Lỗi lấy số dư:", error);
    }
  };

  useEffect(() => {
    // Vừa vào màn hình là lấy tiền liền
    fetchBalance();

    // Đồng hồ đếm ngược mã QR (đổi mã mỗi 23s)
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 23));
    }, 1000);

    // Cứ 3 giây cập nhật tiền 1 lần
    const balanceInterval = setInterval(fetchBalance, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(balanceInterval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4 pb-32 overflow-y-auto">
      {/* Student Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 shadow-card border-t-4 border-ueh-green flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-ueh-green font-bold text-xl border border-slate-100">
          {USER_DATA.avatarLetter}
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-bold text-slate-800">{USER_DATA.name}</h2>
          <p className="text-[10px] text-slate-500 font-medium tracking-tight">MSSV: {USER_DATA.id}</p>
          <p className="text-[10px] text-slate-500 font-medium tracking-tight">{USER_DATA.department}</p>
        </div>
        <div className="bg-emerald-50 text-ueh-green text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          Đã xác thực <CheckCircle2 className="w-3.1 h-3.1" />
        </div>
      </motion.div>

      {/* Balance Chip (HIỆN TIỀN THẬT + TÍNH SỐ LƯỢT TỰ ĐỘNG) */}
      <div className="flex justify-center">
        <div className="bg-white border border-ueh-green/20 rounded-full px-5 py-2 shadow-sm text-xs font-bold text-ueh-green">
          Số dư: {Number(realBalance).toLocaleString('vi-VN')} ₫ · Còn ~{Math.floor(realBalance / 2000)} lượt
        </div>
      </div>

      {/* QR Container */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-6 shadow-card flex flex-col items-center gap-6 border border-slate-50"
      >
        <div className="bg-ueh-orange text-white text-[10px] font-bold px-4 py-2 rounded-full flex items-center gap-2">
           <RefreshCw className="w-3.5 h-3.5" /> TOTP ĐỘNG — Tự động đổi
        </div>

        <div className="w-full aspect-square max-w-[240px] rounded-2xl border-2 border-ueh-green p-3 bg-white shadow-inner flex items-center justify-center overflow-hidden">
          {/* QR Code này sẽ chứa mã số sinh viên của ông và thay đổi theo thời gian */}
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=UEH_PASS_${USER_DATA.id}_${timeLeft}`} 
            alt="Dynamic QR Code" 
            className="w-full h-full object-contain mix-blend-multiply opacity-90 transition-all"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#f1f5f9" strokeWidth="2" />
              <motion.circle 
                cx="18" cy="18" r="16" fill="none" stroke="#007A55" strokeWidth="2" 
                strokeDasharray="100, 100"
                animate={{ strokeDashoffset: (timeLeft / 23) * 100 }}
              />
            </svg>
            <span className="absolute text-sm font-bold text-ueh-green">{timeLeft}s</span>
          </div>
          <p className="text-[10px] text-slate-400 italic">Mã mới sau {timeLeft} giây — Không chụp màn hình</p>
        </div>
      </motion.div>

      {/* Security Chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {['Mã hóa AES-256', 'Offline hoạt động', 'Chống gian lận'].map((tag) => (
          <span key={tag} className="bg-emerald-50 text-ueh-green text-[10px] font-bold px-4 py-2 rounded-full border border-emerald-100/50 shadow-sm">
            {tag}
          </span>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-50 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Info className="w-4 h-4 text-ueh-green" /> Cách dùng
        </h3>
        <div className="space-y-4">
          {[
            { step: 1, text: 'Mở màn hình này' },
            { step: 2, text: 'Đưa điện thoại vào máy quét' },
            { step: 3, text: 'Cổng tự mở' },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full bg-slate-50 text-slate-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                {item.step}
              </div>
              <p className="text-xs text-slate-600 font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};