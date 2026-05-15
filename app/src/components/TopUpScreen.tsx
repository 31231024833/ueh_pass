/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, Landmark, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TopUpScreen: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState(50000);
  const [selectedMethod, setSelectedMethod] = useState('vnpay'); 
  
  // 1. Khai báo state cho tiền thật và trạng thái hiện QR
  const [realBalance, setRealBalance] = useState(0);
  const [showQR, setShowQR] = useState(false);

  const amounts = [20000, 50000, 100000, 200000, 500000];

  // 2. Hàm lấy số dư thật từ Backend InfinityFree
  const fetchBalance = async () => {
    try {
      const response = await fetch('https://ueh-pass-potts.rf.gd/backend/controllers/api_get_balance.php');
      const result = await response.json();
      if (result.status === 'success') {
        const newBalance = result.data.balance;
        
        // Trick tự động đóng màn hình QR và hiện thông báo khi nạp tiền
        setRealBalance((prevBalance) => {
          if (prevBalance > 0 && newBalance > prevBalance) {
            setShowQR(false); 
            alert(`🎉 Ting ting! Nạp thành công ${(newBalance - prevBalance).toLocaleString('vi-VN')} ₫ vào ví!`); 
          }
          return newBalance;
        });
      }
    } catch (error) {
      console.error("Lỗi lấy số dư:", error);
    }
  };

  // 3. Tự động lấy tiền lúc mới vào và cập nhật mỗi 3 giây
  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 3000);
    return () => clearInterval(interval);
  }, []);

  // 4. Tạo mã VietQR động
  const getVietQR = () => {
    const BANK_ID = "vietinbank"; 
    const ACCOUNT_NO = "100872880702"; 
    const ACCOUNT_NAME = "HUYNH NHAT QUANG"; 
    const TEMPLATE = "compact2";
    const CONTENT = "NAPTIEN 1"; 
    
    return `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${selectedAmount}&addInfo=${CONTENT}&accountName=${ACCOUNT_NAME}`;
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="bg-ueh-green w-full py-4 px-4 flex flex-col justify-center text-white">
        <div className="text-sm opacity-90">Số dư hiện tại: <span className="font-bold">{Number(realBalance).toLocaleString('vi-VN')} ₫</span></div>
        <div className="text-[10px] opacity-60 mt-0.5 italic">Số dư tối thiểu khuyến nghị: 20.000 ₫</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-32 space-y-6">
        {/* Denominations */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Chọn mệnh giá</h2>
          <div className="grid grid-cols-2 gap-3">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`py-3.5 rounded-xl text-sm font-bold border transition-all ${
                  selectedAmount === amount 
                    ? 'bg-orange-50 border-ueh-orange text-ueh-orange shadow-md' 
                    : 'bg-white border-slate-100 text-slate-800 hover:border-slate-200'
                }`}
              >
                {amount.toLocaleString('vi-VN')} ₫
              </button>
            ))}
            <button className="bg-white border border-dashed border-slate-200 rounded-xl py-3.5 text-sm font-medium text-slate-400">
              Nhập khác
            </button>
          </div>
          <p className="text-[10px] text-slate-400 italic">Tối thiểu 10.000 ₫ — Tối đa 2.000.000 ₫</p>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Phương thức thanh toán</h2>
          <div className="flex flex-col gap-3">
            {[
              { id: 'vnpay', name: 'Ngân hàng / VietQR', icon: Landmark, desc: 'Miễn phí giao dịch' },
              { id: 'momo', name: 'Ví MoMo', icon: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png', desc: '' }, 
              { id: 'zalopay', name: 'ZaloPay', icon: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png', desc: '' },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-xl flex items-center border transition-all ${
                  selectedMethod === method.id 
                    ? 'border-ueh-orange bg-orange-50/10 shadow-card' 
                    : 'border-slate-50 bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-slate-50 overflow-hidden border border-slate-100 italic">
                  {typeof method.icon === 'string' ? (
                    <img src={method.icon} alt={method.name} className="w-6 h-6 object-contain" />
                  ) : (
                    <method.icon className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-bold text-slate-800">{method.name}</div>
                  {method.desc && <div className="text-[10px] text-slate-400">{method.desc}</div>}
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedMethod === method.id ? 'border-ueh-orange bg-ueh-orange' : 'border-slate-200 bg-white'
                }`}>
                  {selectedMethod === method.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-emerald-50/50 rounded-2xl p-4 space-y-3 border border-emerald-100">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Nạp vào ví</span>
            <span className="font-bold text-slate-800">{selectedAmount.toLocaleString('vi-VN')} ₫</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Phí giao dịch</span>
            <span className="font-bold text-ueh-green">Miễn phí</span>
          </div>
          <div className="h-px bg-ueh-green/10"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-800">Tổng thanh toán</span>
            <span className="text-lg font-bold text-ueh-dark-green">{selectedAmount.toLocaleString('vi-VN')} ₫</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="absolute bottom-20 left-0 w-full p-4 bg-white border-t border-slate-100 z-10 box-border">
        <button 
          onClick={() => setShowQR(true)}
          className="w-full h-14 bg-ueh-orange text-white rounded-xl font-bold shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Nạp {selectedAmount.toLocaleString('vi-VN')} ₫ qua {selectedMethod.toUpperCase()}
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-2">Mã QR sẽ được tạo tự động để bạn quét</p>
      </div>

      {/* MÀN HÌNH POPUP HIỆN MÃ QR */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-6"
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Quét mã để nạp tiền</h2>
            <p className="text-sm text-slate-500 mb-8 text-center max-w-xs">
              Mở ứng dụng ngân hàng hoặc ví điện tử để quét mã.<br/>Hệ thống sẽ cộng tiền tự động sau 3-5 giây.
            </p>
            
            <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 mb-8 relative">
              <img src={getVietQR()} alt="VietQR" className="w-64 h-64 object-contain" />
            </div>

            <div className="bg-emerald-50 text-ueh-green px-6 py-3 rounded-full font-bold flex items-center gap-2 animate-pulse shadow-sm">
              <CheckCircle2 className="w-5 h-5" /> Đang chờ thanh toán...
            </div>
            
            <p className="text-xs text-slate-400 mt-6 italic">Giao dịch an toàn & bảo mật</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};