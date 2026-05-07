<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../models/Wallet.php';
require_once __DIR__ . '/../models/Transaction.php';

class WalletController {
    private $db;
    private $wallet;
    private $transaction;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->wallet = new Wallet($this->db);
        $this->transaction = new Transaction($this->db);
    }

    public function fakeTopUp($user_id, $amount) {
        if ($this->wallet->updateBalance($user_id, $amount)) {
            $this->transaction->logTransaction($user_id, $amount, 'topup', "Nạp tiền - Giả lập MVP");
            return json_encode(["status" => "success", "message" => "Đã nạp " . number_format($amount) . " đ"], JSON_UNESCAPED_UNICODE);
        }
        return json_encode(["status" => "error", "message" => "Lỗi nạp tiền"], JSON_UNESCAPED_UNICODE);
    }

    public function simulateScanQR($user_id) {
        $fee = 2000; 
        $current_balance = $this->wallet->getBalance($user_id);

        if ($current_balance >= $fee) {
            if ($this->wallet->updateBalance($user_id, -$fee)) {
                $this->transaction->logTransaction($user_id, -$fee, 'charge', "Vào bãi - Cơ sở B");
                return json_encode([
                    "status" => "success", 
                    "message" => "Mở Barie! Số dư còn: " . number_format($current_balance - $fee) . " đ"
                ], JSON_UNESCAPED_UNICODE);
            }
        }
        
        return json_encode(["status" => "error", "message" => "Không đủ tiền!"], JSON_UNESCAPED_UNICODE);
    }
}
?>
