<?php 
    class Database{

        private $host = '127.0.0.1';
        private $db_name = 'bibli';
        private $username = 'root';
        private $password = '';
        private $conn;

        public function connect(){
            $this->conn = null;

            try{
                $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name,
                $this->username, $this->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }catch(PDOException $e){
                echo 'connection error: ' . $e->getMessage();
            }
            return $this->conn;

        }
    }
