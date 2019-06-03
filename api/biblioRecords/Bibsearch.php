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
				$q = ($_GET["q"]);
				getSearchResults($db, $q );
				break;
			case 'POST':
				break;
			case 'PUT':
				break;
			case 'DELETE':
				break;
			case 'OPTIONS':
				break;
			default:
				getRecords($db);
				// Invalid Request Method
				//header("HTTP/1.0 405 Method Not Allowed");
				break;
		}
    }
	
	function getSearchResults($db, $q)
    {
		
		$query = 'SELECT * FROM refactor_books_new WHERE title = ?';
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $q);

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


?>