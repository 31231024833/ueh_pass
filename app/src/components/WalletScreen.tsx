/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Plus, Car, Calendar, Clock, ChevronRight } from 'lucide-react';
import { TRANSACTIONS, USER_DATA } from '../types';
import { motion } from 'motion/react';

export const WalletScreen: React.FC = () => {
  const [realBalance, setRealBalance] = useState(0);

  // Gọi API lấy số dư từ InfinityFree
  const fetchBalance = async () => {
    try {
      const response = await fetch('http://ueh-pass-potts.rf.gd/backend/controllers/api_get_balance.php');
      const result = await response.json();
      if (result.status === 'success') {
        setRealBalance(Number(result.data.balance) || 0);
      }
    } catch (error) {
      console.error("Lỗi lấy số dư:", error);
    }
  };

  useEffect(() => {
    fetchBalance(); 
    const interval = setInterval(() => {
      fetchBalance(); 
    }, 3000);
    return () => clearInterval(interval); 
  }, []);

  const currentTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col gap-6 p-4 pb-24">
      {/* Hero Balance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-ueh-dark-green rounded-[20px] p-6 relative overflow-hidden text-white shadow-xl"
      >
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-ueh-green rounded-full opacity-50 blur-xl"></div>
        <div className="relative z-10 space-y-4">
          <p className="text-sm text-white/70 font-medium">Số dư khả dụng ({USER_DATA.name})</p>
          
          {/* Nơi hiện số dư thật */}
          <h2 className="text-4xl font-bold tracking-tight">{Number(realBalance).toLocaleString('vi-VN')} ₫</h2>
          
          <p className="text-[10px] text-white/50">Cập nhật lúc {currentTime}</p>
          <div className="flex gap-2 pt-2">
            <button className="bg-ueh-orange text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg active:scale-95 transition-transform">
              Nạp tiền <Plus className="w-4 h-4" />
            </button>
            <button className="bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors">
              Lịch sử
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Car, label: 'Hôm nay', value: '2 lượt' },
          { icon: Calendar, label: 'Tháng này', value: '38 lượt' },
          { icon: Clock, label: 'Tiết kiệm', value: '~15 phút' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
            className="bg-white rounded-xl p-3 shadow-card flex flex-col items-center justify-center gap-1.5"
          >
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
              <stat.icon className="w-4.5 h-4.5" />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">{stat.label}</p>
            <p className="text-xs font-bold text-slate-800">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Transaction Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-bold text-slate-800">Giao dịch gần đây</h3>
          <button className="text-ueh-orange text-[10px] font-bold">Xem tất cả</button>
        </div>

        <div className="flex flex-col gap-3">
          {TRANSACTIONS.map((tx, i) => (
            <motion.div 
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="bg-white h-16 rounded-xl p-3 flex items-center justify-between shadow-card hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'expense' ? 'bg-emerald-50 text-ueh-green' : 'bg-orange-50 text-ueh-orange'}`}>
                  {tx.type === 'expense' ? <Car className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">{tx.title}</span>
                  <span className="text-[10px] text-slate-400">{tx.time}</span>
                </div>
              </div>
              <span className={`text-xs font-bold ${tx.type === 'expense' ? 'text-rose-500' : 'text-ueh-green'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('vi-VN')} ₫
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};