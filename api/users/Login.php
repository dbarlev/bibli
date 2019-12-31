<?php

    require '../inc/inc.php';;
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


        $q1 = "SELECT * FROM users WHERE email = ? ";
        $res1 = $db->prepare($q1);
		$res1->bindParam(1, $email);
	
        $res1->execute();
        $result = $res1->rowCount();
        $user_row = $res1->fetch(PDO::FETCH_ASSOC);
      
        $db_password = $user_row['password'];
     

        if($result == 0) { // user dosent exist
            echo json_encode(array('userid' => $user_row['userid'], 'auth'=> false, 'error' => 1));
        }else if($result > 0 && !password_verify($password, $db_password) ){ // pasword exists and user activated but wrong password
            echo json_encode(array('userid' => $user_row['userid'], 'auth'=> false, 'error' => 2));
      
        }else if($result > 0 && $user_row['active'] == 0 ) { //user exists but not active
            echo json_encode(array('userid' => $user_row['userid'], 'auth'=> false, 'error' => 3));
         }else { 
            echo json_encode(array('userid' => $user_row['userid'], 'auth'=> true, 'error' => null));
        }
    }

  