/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ScreenType {
  WALLET = 'wallet',
  PARKING = 'parking',
  TOPUP = 'topup',
  PROFILE = 'profile',
}

export interface Transaction {
  id: string;
  title: string;
  time: string;
  amount: number;
  type: 'expense' | 'income';
  location?: string;
  method?: string;
}

export interface UserInfo {
  name: string;
  id: string;
  department: string;
  tier: string;
  balance: number;
  avatarLetter: string;
}

export const USER_DATA = {
  name: 'Howard Potts',
  id: '31231022601',
  department: 'K49 - Thương mại điện tử', 
  avatarLetter: 'H', // Chữ cái đầu của tên để làm avatar
  balance: 0, // Cứ để 0 vì mình đã dùng tiền thật thay thế rồi
  tier: 'Hạng Vàng',
};

export const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Vào bãi — Cơ sở B',
    time: '10:30, hôm nay',
    amount: -2000,
    type: 'expense',
  },
  {
    id: '2',
    title: 'Ra bãi — Cơ sở B',
    time: '08:05, hôm nay',
    amount: -2000,
    type: 'expense',
  },
  {
    id: '3',
    title: 'Nạp tiền — MoMo',
    time: 'Hôm qua',
    amount: 50000,
    type: 'income',
  },
  {
    id: '4',
    title: 'Vào bãi — Cơ sở N',
    time: 'Hôm qua',
    amount: -2000,
    type: 'expense',
  },
];
