<?php
class Database {
    private $host = "sql311.infinityfree.com";        
    private $db_name = "if0_41833300_invisiblepass"; 
    private $username = "if0_41833300";       
    private $password = "hoang240105"; //
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo json_encode(["status" => "error", "message" => "Lỗi CSDL: " . $exception->getMessage()]);
            exit;
        }
        return $this->conn;
    }
}
?>
