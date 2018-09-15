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
		echo json_encode($records_row);
    }

    function setRecords()
    {

    }

    function updateRecords()
    {

    }

	// the delete will only remove the connection of the record from the user.
	// the record will stay on the database, for future search
    function deleteRecordFromUser($db)
    {
		$userid = ($_GET["userid"]);
		$bookid = ($_GET["bookid"]);
		
		$query = 'UPDATE books SET userid = 9000 WHERE bookid = ?'; // hard coded number just for development, on production it should be null
							
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $bookid);
		$stmt->execute();

		getRecords($db);
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
				header("HTTP/1.0 405 Method Not Allowed");
				break;
		}
    }
             

?>