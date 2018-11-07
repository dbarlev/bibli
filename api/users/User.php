<?php

    include_once '../config/Database.php';
    init();


    function init()
    {
		$database = new Database();
		$db = $database->connect();
		CreateHeaders();
		verifyRequestMethod($db);
		echo 'init is running';
    }

    function CreateHeaders()
    {

		header("Access-Control-Allow-Origin: *");
		header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
		header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
			
    }
    
	function verifyRequestMethod($db)
    {
		$request_method = $_SERVER["REQUEST_METHOD"];
        switch($request_method)
		{
			case 'GET':
				$userID = ($_GET["userid"]);
				get_user_data($db, $userID);
				break;
			case 'POST':
				return set_user_data($db);
				break;
			case 'DELETE':
				delete_user($db);
				break;
			case 'PUT':
				update_user($db);
				break;
		
		}
    }
	
    function getRecords($db, $email)
    {
		 $query = 'SELECT * FROM users WHERE email = ?';
							
		 $stmt = $db->prepare($query);
		 $stmt->bindParam(1, $email);
		 $stmt->execute();
		
		$records_row = $stmt->fetchAll(PDO::FETCH_ASSOC);
		var_dump($records_row);
		foreach(  $records_row as $key => &$value )
		{
			// $records_row[$key]["wFname"] = unserialize($value["wFname"]);
			// $records_row[$key]["wLname"] = unserialize($value["wLname"]);
			
		}
		unset($value);
		echo json_encode($records_row);
    }

    function set_user_data($db)
    {
<<<<<<< HEAD

		echo 'set_user_data';
=======
>>>>>>> 34b31275a2528f0edff06e0103c6a4add5919870
		 $data = json_decode(file_get_contents('php://input'));	
		
		 $usertype = 9;
		 if(isset($data->name)) $name = $data->name; else  $name = null;
		 if(isset($data->email)) $email = $data->email; else  $email = null;
		 if(isset($data->username)) $username = $data->username; else  $username = null;
		 if(isset($data->password)) $password = $data->password; else  $password = null;
		 if(isset($data->subscription)) $subscription = $data->subscription; else  $subscription = null;
		 
		 
		 $query = "INSERT INTO users
					(usertype, name, username, password, email) 
					 VALUES (?,?,?,?,?)";
					 
		 $stmt = $db->prepare($query);
		 $stmt->bindParam(1, $usertype);
		 $stmt->bindParam(2, $name);
		 $stmt->bindParam(3, $username);
		 $stmt->bindParam(4, $password);
		 $stmt->bindParam(5, $email);
	
		 $stmt->execute();
		 
		getRecords($db, $email);
    }

    function deleteRecordFromUser($db)
    {
		$userid = ($_GET["userid"]);
		$recordID = ($_GET["recordID"]);
		
		$query = 'UPDATE refactor_books SET userid = 9000 WHERE bookid = ?';
							
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $recordID);
		$stmt->execute();

		getRecords($db, $userid);
    }

?>