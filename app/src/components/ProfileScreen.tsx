/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, CreditCard, History, Lock, Fingerprint, Smartphone, HelpCircle, FileText, LogOut, Car, Star, Settings, ChevronRight } from 'lucide-react';
import { USER_DATA } from '../types';
import { motion } from 'motion/react';

export const ProfileScreen: React.FC = () => {
  const menuGroups = [
    {
      items: [
        { icon: User, label: 'Thông tin cá nhân' },
        { icon: CreditCard, label: 'Phương thức thanh toán' },
        { icon: History, label: 'Lịch sử dịch vụ' },
      ]
    },
    {
      items: [
        { icon: Lock, label: 'Đổi mã PIN' },
        { icon: Fingerprint, label: 'Xác thực khuôn mặt/Vân tay' },
        { icon: Smartphone, label: 'Thiết bị đã đăng nhập' },
      ]
    },
    {
      items: [
        { icon: HelpCircle, label: 'Trung tâm trợ giúp' },
        { icon: FileText, label: 'Điều khoản & Chính sách' },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-6 p-4 pb-32 overflow-y-auto">
      {/* Profile Header */}
      <section className="flex flex-col items-center gap-3 mt-4">
        <div className="w-24 h-24 bg-white rounded-full shadow-card flex items-center justify-center border-2 border-ueh-green/10 relative p-1 group">
          <div className="w-full h-full rounded-full bg-emerald-50 flex items-center justify-center">
            <span className="text-4xl font-black text-ueh-green select-none">{USER_DATA.avatarLetter}</span>
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-ueh-green text-white rounded-full flex items-center justify-center border-4 border-background shadow-md">
            <User className="w-4 h-4 fill-white" />
          </button>
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{USER_DATA.name}</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">MSSV: {USER_DATA.id}</p>
        </div>

        <div className="bg-ueh-orange text-white px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-md shadow-ueh-orange/20 animate-pulse">
           <Star className="w-3.5 h-3.5 fill-white" />
           <span className="text-[11px] font-bold uppercase tracking-wider">{USER_DATA.tier}</span>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-2 gap-4">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="bg-white p-5 rounded-2xl shadow-card flex flex-col items-center gap-2 group"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-ueh-green group-hover:bg-ueh-green group-hover:text-white transition-all">
            <Car className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-700">Quản lý xe</span>
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="bg-white p-5 rounded-2xl shadow-card flex flex-col items-center gap-2 group"
        >
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-ueh-orange group-hover:bg-ueh-orange group-hover:text-white transition-all">
            <Star className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-700">Điểm thưởng</span>
        </motion.button>
      </section>

      {/* Menu Groups */}
      <div className="space-y-4">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="bg-white rounded-2xl shadow-card overflow-hidden border border-slate-50">
            {group.items.map((item, iIdx) => (
              <button 
                key={iIdx}
                className={`w-full px-5 py-4 flex items-center justify-between transition-colors hover:bg-slate-50 active:bg-slate-100 ${
                  iIdx !== group.items.length - 1 ? 'border-b border-slate-50' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-ueh-green">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full bg-white text-rose-500 font-bold text-sm py-4 rounded-xl border border-rose-100 shadow-sm active:scale-[0.98] transition-transform mb-12 flex items-center justify-center gap-2">
        <LogOut className="w-5 h-5" /> Đăng xuất
      </button>
    </div>
  );
};
