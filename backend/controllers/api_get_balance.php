<?php
// 1. Giấy thông hành CORS - Cho phép Frontend (React/Web) ở link khác được phép lấy dữ liệu
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// THẦN CHÚ Ở ĐÂY: Bổ sung thêm ngrok-skip-browser-warning vào danh sách VIP
header("Access-Control-Allow-Headers: Content-Type, ngrok-skip-browser-warning");
header('Content-Type: application/json; charset=utf-8');

// Xử lý "thằng lính thám thính" (Preflight) của trình duyệt
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // 2. Kết nối Database ueh_pass
    $pdo = new PDO('mysql:host=localhost;dbname=ueh_pass', 'root', '');

    // 3. Tạm thời lấy số dư của user số '1'
    $user_id = '1';

    // 4. Lấy tiền từ bảng wallets
    $stmt = $pdo->prepare("SELECT user_id, balance FROM wallets WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $wallet = $stmt->fetch(PDO::FETCH_ASSOC);

    // 5. Trả kết quả về cho Frontend
    if ($wallet) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Lấy số dư thành công!',
            'data' => $wallet
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Không tìm thấy ví của sinh viên này'
        ]);
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Lỗi hệ thống: ' . $e->getMessage()]);
}
?>