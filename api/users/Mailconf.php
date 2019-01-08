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
            $mailconf = $_GET['mailconf'];
            activate_user($db, $mailconf );
				break;
			case 'POST':
				// createList($db);
				break;
            case 'PUT':
                $mailconf = $_GET['mailconf'];
				activate_user($db, $mailconf );
				break;
			case 'DELETE':
				// removeList($db);
				break;
			default:
			
				break;
		}
    }

    function activate_user($db, $mailconf){

        $q = "SELECT * FROM users WHERE verification_code = ? AND active = 0";
        $res = $db->prepare($q);
		$res->bindParam(1, $mailconf);
        $res->execute();
        $num = $res->rowCount();
        
        if($num>0){

            $query = 'UPDATE users SET active = 1 WHERE verification_code = ?';
            $stmt = $db->prepare($query);
            $stmt->bindParam(1, $mailconf);
            $stmt->execute();
            echo 'כתובת המייל אושרה';
        }else if($num = 0){
            echo 'חשבון המייל שלכם אושר בעבר, ';
        }
	

    }