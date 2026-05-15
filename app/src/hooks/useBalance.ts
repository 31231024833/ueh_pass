import { useState, useEffect } from 'react';

export const useBalance = () => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      // ĐÃ THAY LOCALHOST BẰNG ĐỊA CHỈ NHÀ MỚI (CÓ CHỮ S ĐỂ BẢO MẬT)
      const response = await fetch('https://ueh-pass-potts.rf.gd/backend/controllers/api_get_balance.php');
      const result = await response.json();
      if (result.status === 'success') setBalance(result.data.balance);
    } catch (error) {
      console.error("Lỗi lấy số dư:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 3000); // 3 giây cập nhật 1 lần toàn app
    return () => clearInterval(interval);
  }, []);

  return { balance, fetchBalance };
};