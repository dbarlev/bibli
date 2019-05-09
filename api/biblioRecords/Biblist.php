<?php

    include_once '../config/Database.php';
    init();


    function init()
    {
		$database = new Database();
		$db = $database->connect();
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
				//($_GET["names"]) == "true" ? getListsNames($db, $userID) : getLists($db, $userID);
				getListsNames($db, $userID); 
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
			case 'OPTIONS':
				break;
			default:
				getLists($db, $userID);
				// Invalid Request Method
				//header("HTTP/1.0 405 Method Not Allowed");
				break;
		}
    }
	
	function getListsNames($db, $userID)
    {
		$query = 'SELECT * FROM biblist 
		  			where userid = ?';
							
		 $stmt = $db->prepare($query);
		 $stmt->bindParam(1, $userID);
		 $stmt->execute();
		
		$records_row = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($records_row);
	}
	
    function getLists($db, $userID)
    {
		//   $query = 'SELECT * FROM biblist 
		//  			where userid = ?';

		$query = 'SELECT * FROM biblist 
						LEFT JOIN refactor_books_new 
							ON biblist.id = refactor_books_new.BiblistID 
								INNER JOIN recordtype
									ON (refactor_books_new.RecordType = recordtype.RecordID)
																	WHERE biblist.Userid = ?';
							
		 $stmt = $db->prepare($query);
		 $stmt->bindParam(1, $userID);
		 $stmt->execute();
		
		$records_row = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach($records_row as $key => &$value )
		{
			$records_row[$key]["wFname"] = unserialize($value["wFname"]);
			$records_row[$key]["wLname"] = unserialize($value["wLname"]);
		}
		unset($value);

		echo json_encode($records_row);
    }

    function createList($db)
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