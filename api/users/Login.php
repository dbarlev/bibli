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
                break;
            case 'POST':
                get_users($db);
				break;
            case 'PUT':
                break;
			case 'DELETE':
                break;
            case 'OPTIONS':
				break;
			default:
				break;
		}
    }
    
    
    function get_users($db){

        $data = json_decode(file_get_contents('php://input'));

        if(isset($data->email)) $email = $data->email; else  $email = null;
        if(isset($data->password)) $password = $data->password; else  $password = null;


        $q1 = "SELECT * FROM users WHERE email = ? AND password = ?";
        $res1 = $db->prepare($q1);
		$res1->bindParam(1, $email);
		$res1->bindParam(2, $password);
        $res1->execute();
        $result = $res1->rowCount();
        $user_row = $res1->fetch(PDO::FETCH_ASSOC);
        //var_dump($user_row);

        if($result > 0) {
            echo json_encode(array('userid' => $user_row['userid'], 'auth'=> true));
        }else {
            echo json_encode(array('auth'=> false));
        }
    }

  