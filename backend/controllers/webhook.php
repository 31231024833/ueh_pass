<?php
// 1. Kết nối với Database trên mây InfinityFree
$pdo = new PDO('mysql:host=sql301.infinityfree.com;dbname=if0_41925776_ueh_pass', 'if0_41925776', 'lmaHilhINbX');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// 2. Nhận tiền từ SePay
$payload = file_get_contents('php://input');
$data = json_decode($payload);

if ($data && isset($data->transferAmount)) {
    $amount = $data->transferAmount;        
    $content = $data->transferContent;      
    
    // Tìm ID user (Ví dụ nội dung: "NAPTIEN 1")
    $user_id = '1'; 
    if (preg_match('/NAPTIEN\s+(\d+)/i', $content, $matches)) {
        $user_id = $matches[1];
    }

    // 3. CỘNG TIỀN VÀO VÍ TRÊN CLOUD
    $stmt = $pdo->prepare("UPDATE wallets SET balance = balance + ? WHERE user_id = ?");
    $stmt->execute([$amount, $user_id]);

    // Ghi log để Pót dễ kiểm tra
    $thong_bao = date('Y-m-d H:i:s') . ": Da cong $amount VND cho sinh vien $user_id. Noi dung: $content\n";
    file_put_contents('log.txt', $thong_bao, FILE_APPEND);
}

http_response_code(200);
?>