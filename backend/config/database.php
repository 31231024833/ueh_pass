<?php
class Database {
    private $host = "sql301.infinityfree.com";        
    private $db_name = "if0_41925776_ueh_pass"; 
    private $username = "if0_41925776";       
    private $password = "lmaHilhINbX"; 
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo json_encode(["status" => "error", "message" => "Lỗi hệ thống: " . $exception->getMessage()]);
            exit;
        }
        return $this->conn;
    }
}
?>