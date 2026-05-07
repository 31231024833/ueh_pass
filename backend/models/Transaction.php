<?php
class Transaction {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function logTransaction($user_id, $amount, $type, $description) {
        $query = "INSERT INTO Transactions (user_id, amount, type, description) VALUES (:user_id, :amount, :type, :description)";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':description', $description);
        
        return $stmt->execute();
    }
}
?>
