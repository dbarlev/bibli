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
				get_user_data($db, $userID);
				break;
			case 'POST':
				set_user_data($db);
				break;
			case 'PUT':
				update_user($db);
				break;
			case 'DELETE':
				delete_user($db);
				break;
			default:
				get_users($db);
				// Invalid Request Method
				//header("HTTP/1.0 405 Method Not Allowed");
				break;
		}
    }
	
    function getRecords($db, $userID)
    {
		 $query = 'SELECT * FROM refactor_books
						INNER JOIN recordtype
							ON (refactor_books.RecordType = recordtype.RecordID)
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

    function set_user_data($db)
    {
		var_dump($db);
		echo 'set_user_data';
		 $data = json_decode(file_get_contents('php://input'));	
		 var_dump($data);
		//  if(isset($data->userid)) $userID = $data->userid; else  $userID = null;
		//  if(isset($data->chapter)) $chapter = $data->chapter; else  $chapter = null;
		//  if(isset($data->pages)) $pages = $data->pages; else  $pages = null;
		//  if(isset($data->publishname)) $publishname = $data->publishname; else  $publishname = null;
		//  if(isset($data->publishcity)) $publishcity = $data->publishcity; else  $publishcity = null;
		//  if(isset($data->kereh)) $kereh = $data->kereh; else  $kereh = null;
		//  if(isset($data->recordType)) $recordType = $data->recordType; else  $recordType = null;
		//  if(isset($data->url)) $url = $data->url; else  $url = null;
		//  if(isset($data->title)) $title = $data->title; else  $title = null;
		//  if(isset($data->retrived)) $retrived = $data->retrived; else  $retrived = null;
		//  if(isset($data->wFname)) $wFname = $data->wFname; else  $wFname = null;
		//  if(isset($data->wLname)) $wLname = $data->wLname; else  $wLname = null;
		//  if(isset($data->name)) $name = $data->name; else  $name = null;
		//  if(isset($data->year)) $year = $data->year; else  $year = null;
		 
		 
		//  $query = "INSERT INTO refactor_books
		// 			(userid, chapter, pages, publishname, publishcity, kereh, RecordType, url, title, retrived,wFname, wLname, name, year) 
		// 			 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

					 
		//  $stmt = $db->prepare($query);
		//  $stmt->bindParam(1, $userID);
		//  $stmt->bindParam(2, $chapter);
		//  $stmt->bindParam(3, $pages);
		//  $stmt->bindParam(4, $publishname);
		//  $stmt->bindParam(5, $publishcity);
		//  $stmt->bindParam(6, $kereh);
		//  $stmt->bindParam(7, $recordType);
		//  $stmt->bindParam(8, $url);
		//  $stmt->bindParam(9, $title);
		//  $stmt->bindParam(10, $retrived);
		//  $stmt->bindParam(11, $wFname);
		//  $stmt->bindParam(12, $wLname);
		//  $stmt->bindParam(13, $name);
		//  $stmt->bindParam(14, $year);
		//  $stmt->execute();
		 
		//  getRecords($db, $userID);
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