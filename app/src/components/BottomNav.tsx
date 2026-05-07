/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Wallet, QrCode, CreditCard, User, Home, ParkingSquare } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onScreenChange }) => {
  const tabs = [
    { id: ScreenType.WALLET, label: 'Ví', icon: Wallet },
    { id: ScreenType.TOPUP, label: 'Nạp tiền', icon: CreditCard },
    { id: ScreenType.PARKING, label: 'Thẻ QR', icon: QrCode },
    { id: ScreenType.PROFILE, label: 'Tài khoản', icon: User },
  ];

  return (
    <nav className="bg-white border-t border-slate-100 w-full z-[100] flex justify-around items-center px-4 pt-3 pb-8 shadow-[0_-4px_20px_rgba(0,92,64,0.08)] rounded-t-3xl mt-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onScreenChange(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 relative gap-1 ${
              isActive ? 'text-ueh-green font-bold scale-105' : 'text-slate-400'
            }`}
          >
            {isActive && (
              <div className="absolute -top-3 w-1 h-1 rounded-full bg-ueh-green"></div>
            )}
            <Icon className={`w-6 h-6 ${isActive ? 'fill-ueh-green/10' : ''}`} />
            <span className="text-[10px] font-medium tracking-wide uppercase">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
