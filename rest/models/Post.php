<?php

    class Post{
        private $conn;
        private $table = 'users';

        public $id;
        public $fname;
        public $lname;
        
        public function __construct($db){
            $this->conn = $db;
        }

        public function read(){
            $query = 'SELECT * FROM
                ' . $this->table . ' u
                LEFT JOIN
                books b ON b.userid = u.userid LIMIT 30';  
            
            $stmt = $this->conn->prepare($query);

            $stmt->execute();

            return $stmt;
        }

        public function read_single(){
            $query = 'SELECT * FROM
                ' . $this->table . ' u
                LEFT JOIN
                    books b ON b.userid = u.userid 
                WHERE
                    b.userid = ?'; 

            
            $stmt = $this->conn->prepare($query);
            
            $stmt->bindParam(1, $this->userid);
            
            $stmt->execute();

            return $stmt;
        }

        public function get_all_bibs_by_user(){
            $query = 'SELECT * FROM
                books  
            WHERE
                userid = ?'; 

        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(1, $this->userid);
        
        $stmt->execute();

        
        return $stmt;
        }
    }
