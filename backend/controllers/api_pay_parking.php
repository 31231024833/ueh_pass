<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

date_default_timezone_set('Asia/Ho_Chi_Minh');

$current_hour = (int)date('H');
if ($current_hour < 18) {
    $fee = 4000;
    $khung_gio = "Truoc 18h";
} else {
    $fee = 6000;
    $khung_gio = "Sau 18h";
}

$user_id = '1';

try {
    // THAY THẾ LOCALHOST BẰNG CLOUD TẠI ĐÂY
    $pdo = new PDO('mysql:host=sql301.infinityfree.com;dbname=if0_41925776_ueh_pass', 'if0_41925776', 'lmaHilhINbX');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT balance FROM wallets WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $wallet = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($wallet) {
        if ($wallet['balance'] >= $fee) {
            $update = $pdo->prepare("UPDATE wallets SET balance = balance - ? WHERE user_id = ?");
            $update->execute([$fee, $user_id]);

            echo json_encode([
                'status' => 'success',
                'message' => "Thanh toan $fee VND ($khung_gio). Mo Barie!",
                'remaining_balance' => $wallet['balance'] - $fee
            ]);
        } else {
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