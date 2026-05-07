<?php
// Giấy thông hành cho Frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

// 1. CỰC KỲ QUAN TRỌNG: Cài đặt múi giờ Việt Nam
date_default_timezone_set('Asia/Ho_Chi_Minh');

// 2. Lấy giờ hiện tại (Định dạng 24h, từ 00 đến 23)
$current_hour = (int)date('H');

// 3. Logic giá tiền: Nhỏ hơn 18 (tức là trước 18h00) thì 4k, từ 18 trở đi là 6k
if ($current_hour < 18) {
    $fee = 4000;
    $khung_gio = "Truoc 18h";
} else {
    $fee = 6000;
    $khung_gio = "Sau 18h";
}

// Tạm thời fix cứng user 1
$user_id = '1';

try {
    $pdo = new PDO('mysql:host=localhost;dbname=ueh_pass', 'root', '');

    $stmt = $pdo->prepare("SELECT balance FROM wallets WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $wallet = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($wallet) {
        if ($wallet['balance'] >= $fee) {
            // Đủ tiền -> Tiến hành trừ
            $update = $pdo->prepare("UPDATE wallets SET balance = balance - ? WHERE user_id = ?");
            $update->execute([$fee, $user_id]);

            echo json_encode([
                'status' => 'success',
                'message' => "Thanh toan $fee VND ($khung_gio). Mo Barie!",
                'remaining_balance' => $wallet['balance'] - $fee
            ]);
        } else {
            // Không đủ tiền
            echo json_encode([
                'status' => 'error',
                'message' => "Ban dang thieu tien. Ve $khung_gio gia $fee VND, vui long nap them!"
            ]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Khong tim thay user']);
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Loi he thong: ' . $e->getMessage()]);
}
?>