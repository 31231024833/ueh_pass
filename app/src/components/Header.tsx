/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, Bell, X, CreditCard, Car, CheckCircle2 } from 'lucide-react';
import { ScreenType } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentScreen: ScreenType;
  title: string;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, title }) => {
  const isProfile = currentScreen === ScreenType.PROFILE;
  
  // 1. Trạng thái đóng/mở danh sách thông báo
  const [showNoti, setShowNoti] = useState(false);

  // 2. Danh sách thông báo mẫu
  const notifications = [
    { id: 1, title: 'Nạp tiền thành công', desc: '+50.000đ từ VietinBank', time: '10:10', icon: CreditCard, color: 'text-ueh-orange' },
    { id: 2, title: 'Vào bãi — Cơ sở B', desc: 'Đã quẹt thẻ lúc 07:30', time: '07:30', icon: Car, color: 'text-ueh-green' },
    { id: 3, title: 'Ra bãi — Cơ sở B', desc: 'Giao dịch: -2.000đ', time: 'Hôm qua', icon: CheckCircle2, color: 'text-blue-500' },
  ];

  return (
    <header className={`${isProfile ? 'bg-background' : 'bg-ueh-green'} transition-colors duration-300 flex justify-between items-center w-full px-4 py-3 sticky top-0 z-50`}>
      <div className="flex items-center">
        
        {/* ĐÂY NÈ PÓT: Vòng tròn ngoài w-10 h-10, ảnh bên trong w-[70%] h-[70%] */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200">
          <img 
            src="/logo.png" 
            alt="Avatar" 
            className="w-[70%] h-[70%] object-contain"
          />
        </div>
        
        {!isProfile && <Menu className="text-white w-6 h-6 ml-3 cursor-pointer" />}
      </div>

      <h1 className={`${isProfile ? 'text-ueh-green' : 'text-white'} font-bold text-lg select-none`}>
        {title}
      </h1>

      <div className="flex items-center relative">
        {isProfile ? (
          <button className="text-ueh-green hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        ) : (
          <div className="relative">
            <button onClick={() => setShowNoti(!showNoti)} className="relative p-1">
              <Bell className="text-white w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-ueh-orange border-2 border-ueh-green"></span>
            </button>

            {/* DROPDOWN THÔNG BÁO */}
            <AnimatePresence>
              {showNoti && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNoti(false)}></div>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-10 right-0 w-72 bg-white rounded-2xl shadow-2xl z-50 border border-slate-100 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                      <span className="font-bold text-slate-800 text-sm">Thông báo mới</span>
                      <button onClick={() => setShowNoti(false)}><X className="w-4 h-4 text-slate-400" /></button>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-4 flex gap-3 hover:bg-slate-50 border-b border-slate-50 transition-colors cursor-pointer">
                          <div className={`w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 ${n.color}`}>
                            <n.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex justify-between items-start">
                              <p className="text-[11px] font-bold text-slate-800 leading-tight">{n.title}</p>
                              <span className="text-[9px] text-slate-400 font-medium">{n.time}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5">{n.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  );
};