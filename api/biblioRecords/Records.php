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
				getRecords($db);
				break;
			case 'POST':
				break;
			case 'PUT':
				deleteRecordFromUser($db);
				break;
			case 'DELETE':
				break;
			default:
				getRecords($db);
				// Invalid Request Method
				//header("HTTP/1.0 405 Method Not Allowed");
				break;
		}
    }
    
    function getRecords($db)
    {
		
         $userID = ($_GET["userid"]);

		 $query = 'SELECT * FROM books
						INNER JOIN recordtype
							ON (books.RecordType = recordtype.RecordID)
							WHERE userid = ?';
							
		 $stmt = $db->prepare($query);
		 $stmt->bindParam(1, $userID);
		 $stmt->execute();
		
		$records_row = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach(  $records_row as $key => &$value )
		{
			$records_row[$key]["wFname"] = unserialize($value["wFname"]);
			$records_row[$key]["wLname"] = unserialize($value["wLname"]);
		}
		unset($value);
		echo json_encode($records_row);
    }

    function setRecords()
    {

    }

    function updateRecords()
    {

    }

    function deleteRecordFromUser($db)
    {
		$userid = ($_GET["userid"]);
		$bookid = ($_GET["bookid"]);
		
		$query = 'UPDATE books SET userid = 9000 WHERE bookid = ?';
							
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $bookid);
		$stmt->execute();

		getRecords($db);
    }
          

?>