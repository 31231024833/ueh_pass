<?php
// 1. Kết nối với Database ueh_pass
$pdo = new PDO('mysql:host=localhost;dbname=ueh_pass', 'root', '');

// 2. Nhận tiền từ SePay
$payload = file_get_contents('php://input');
$data = json_decode($payload);

if ($data && isset($data->transferAmount)) {
    $amount = $data->transferAmount;        
    $content = $data->transferContent;      
    
    // Tự động tìm số ID sau chữ NAPTIEN (VD: quét mã QR nó ra "NAPTIEN 1")
    $user_id = '1'; // Mặc định gán cho thằng số 1 nếu lúc chuyển ông lỡ gõ sai cú pháp
    if (preg_match('/NAPTIEN\s+(\d+)/i', $content, $matches)) {
        $user_id = $matches[1];
    }

    // 3. CỘNG TIỀN VÀO DATABASE
    $stmt = $pdo->prepare("UPDATE wallets SET balance = balance + ? WHERE user_id = ?");
    $stmt->execute([$amount, $user_id]);

    // Ghi ra log.txt cho ông dễ theo dõi
    $thong_bao = "Da cong $amount VND cho sinh vien $user_id. Noi dung: $content\n";
    file_put_contents('log.txt', $thong_bao, FILE_APPEND);
}

// Báo SePay là nhận được rồi
http_response_code(200);
?>