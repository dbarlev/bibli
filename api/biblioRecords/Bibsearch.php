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
				$q = $_GET['q'];
				$startIndex = $_GET['startIndex'];
				getSearchResults($db, $q, $startIndex);
				break;
			case 'POST':
				addBibToUser($db);
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
	
	function getSearchResults($db, $q, $startIndex)
    {
    
		$query = "SELECT distinct * FROM refactor_books_new  WHERE title LIKE ? LIMIT ? OFFSET ?";
		$q = "$q%";
		$startIndex = intval($startIndex);
		$end = $startIndex + 20;

		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $q);
		$stmt->bindParam(2, $end, PDO::PARAM_INT);
		$stmt->bindParam(3, $startIndex, PDO::PARAM_INT);

		$stmt->execute();
		$records_row = $stmt->fetchAll(PDO::FETCH_ASSOC);
		try{
			foreach($records_row as $key => &$value )
			{	
				$records_row[$key]["wFname"] = unserialize($value["wFname"]);
				$records_row[$key]["wLname"] = unserialize($value["wLname"]);		
			}
		}
		finally{
			unset($value);
		}
		echo json_encode($records_row);
		
	}
	
	function addBibToUser($db){
			$data = json_decode(file_get_contents('php://input'));	
			if(isset($data->userid)) $userID = $data->userid; else  $userID = null;
			if(isset($data->chapter)) $chapter = $data->chapter; else  $chapter = null;
			if(isset($data->pages)) $pages = $data->pages; else  $pages = null;
			if(isset($data->publishname)) $publishname = $data->publishname; else  $publishname = null;
			if(isset($data->publishcity)) $publishcity = $data->publishcity; else  $publishcity = null;
			if(isset($data->kereh)) $kereh = $data->kereh; else  $kereh = null;
			if(isset($data->RecordType)) $recordType = $data->RecordType; else  $recordType = null;
			if(isset($data->url)) $url = $data->url; else  $url = null;
			if(isset($data->title)) $title = $data->title; else  $title = null;
			if(isset($data->retrived)) $retrived = $data->retrived; else  $retrived = null;
			if(isset($data->wFname)) $wFname = serialize($data->wFname); else  $wFname = null;
			if(isset($data->wLname)) $wLname = serialize($data->wLname); else  $wLname = null;
			if(isset($data->name)) $name = $data->name; else  $name = null;
			if(isset($data->year)) $year = $data->year; else  $year = null;
			if(isset($data->BiblistID)) $BiblistID = $data->BiblistID; else  $BiblistID = null;

			$query = "INSERT INTO refactor_books_new
					(userid, BiblistID, chapter, pages, publishname, publishcity, kereh, RecordType, url, title, retrived,wFname, wLname, name, year) 
					 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

		
			$stmt = $db->prepare($query);
			$stmt->bindParam(1, $userID);
			$stmt->bindParam(2, $BiblistID);
			$stmt->bindParam(3, $chapter);
			$stmt->bindParam(4, $pages);
			$stmt->bindParam(5, $publishname);
			$stmt->bindParam(6, $publishcity);
			$stmt->bindParam(7, $kereh);
			$stmt->bindParam(8, $recordType);
			$stmt->bindParam(9, $url);
			$stmt->bindParam(10, $title);
			$stmt->bindParam(11, $retrived);
			$stmt->bindParam(12, $wFname);
			$stmt->bindParam(13, $wLname);
			$stmt->bindParam(14, $name);
			$stmt->bindParam(15, $year);
			$stmt->execute();

			getRecords($db, $userID);
	}

	function getRecords($db, $userID)
    {
					
		$query = 'SELECT * FROM biblist 
						LEFT JOIN refactor_books_new 
							ON biblist.id = refactor_books_new.BiblistID 
								INNER JOIN recordtype
									ON (refactor_books_new.RecordType = recordtype.RecordID)
																	WHERE refactor_books_new.userid = ?';
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


?>