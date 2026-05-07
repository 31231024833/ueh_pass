/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WalletScreen } from './components/WalletScreen';
import { TopUpScreen } from './components/TopUpScreen';
import { QRScreen } from './components/QRScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(ScreenType.WALLET);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case ScreenType.WALLET: return 'Invisible Pass';
      case ScreenType.TOPUP: return 'Nạp tiền';
      case ScreenType.PARKING: return 'Thẻ xe kỹ thuật số';
      case ScreenType.PROFILE: return 'Tài khoản';
      default: return 'Invisible Pass';
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenType.WALLET: return <WalletScreen />;
      case ScreenType.TOPUP: return <TopUpScreen />;
      case ScreenType.PARKING: return <QRScreen />;
      case ScreenType.PROFILE: return <ProfileScreen />;
      default: return <WalletScreen />;
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-slate-200">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-[390px] h-[844px] bg-background relative overflow-hidden flex flex-col shadow-2xl my-auto md:rounded-[40px] border-[8px] border-slate-900">
        
        <Header 
          currentScreen={currentScreen} 
          title={getScreenTitle()} 
        />

        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute inset-0 overflow-y-auto"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav 
          currentScreen={currentScreen} 
          onScreenChange={setCurrentScreen} 
        />
        
        {/* Mobile Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-950/20 rounded-full z-[100] hidden md:block"></div>
      </div>
    </div>
  );
}
