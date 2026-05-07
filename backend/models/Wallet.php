<?php
class Wallet {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getBalance($user_id) {
        $query = "SELECT balance FROM Wallets WHERE user_id = :user_id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? (float)$row['balance'] : 0;
    }

    public function updateBalance($user_id, $amount) {
        $query = "UPDATE Wallets SET balance = balance + :amount WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':user_id', $user_id);
        return $stmt->execute();
    }
}
?>
