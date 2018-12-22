<?php

    include_once '../config/Database.php';
    init();
$db = $database->connect();

    function init()
    {
		$database = new Database();
		
		CreateHeaders();
		verifyRequestMethod($db);
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
				getLists($db, $userID);
				break;
			case 'POST':
				createList($db);
				break;
			case 'PUT':
				updateList($db);
				break;
			case 'DELETE':
				removeList($db);
				break;
			default:
				getRecords($db);
				// Invalid Request Method
				//header("HTTP/1.0 405 Method Not Allowed");
				break;
		}
    }
	
    function getLists($db, $userID)
    {
		 $query = 'SELECT * FROM biblist 
		 			where userid = ?
				 		ORDER BY id DESC LIMIT 1';
							
		 $stmt = $db->prepare($query);
		 $stmt->bindParam(1, $userID);
		 $stmt->execute();
		
		$records_row = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $records_row;
		//echo json_encode($records_row);
    }

    function createList($userid, $name)
    {
		 $data = json_decode(file_get_contents('php://input'));	
		 if(isset($data->userid)) $userID = $data->userid; else  $userID = null;
		 if(isset($data->name)) $name = $data->name; else  $name = null;

		 $query = "INSERT INTO biblist
					(userid, name) 
					 VALUES (?,?)";

					 
		 $stmt = $db->prepare($query);
		 $stmt->bindParam(1, $userID);
		 $stmt->bindParam(2, $name);
		 $stmt->execute();
		 
		 return getLists($db, $userID);
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