<?php

    require '../inc/inc.php';
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
            
                resend_mailconf($db);
				break;
            case 'POST':
				break;
            case 'PUT':
                $mailconf = $_GET['mailconf'];
				activate_user($db, $mailconf );
				break;
			case 'DELETE':
                break;
            case 'OPTIONS':
				break;
			default:
				break;
		}
    }
    

    function resend_mailconf($db){
//david_s@achva.ac.il
        $data = json_decode($_GET['userData']);
       


        if(isset($data->email)) $email = $data->email; else  $email = null;


        $q = "SELECT * FROM users WHERE email = ? AND active = 0";
        $res = $db->prepare($q);
        $res->bindParam(1, $email);
        $res->execute();
        $num = $res->rowCount();

        if(!$num){
            json_encode(array('error' => 0));
        }else{

            json_encode(array('error' => null));
        }
    };
    
    function activate_user($db, $mailconf){

        $q1 = "SELECT * FROM users WHERE verification_code = ?";
        $res1 = $db->prepare($q1);
		$res1->bindParam(1, $mailconf);
        $res1->execute();
        $num1 = $res1->rowCount();
        if(!$num1){
            //verification code does not exist in the database
            $json = 0;
        }else{
        
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
                //verification code does exist in the database and active changed from 0 to 1

                $json = 1;

                
            }else{
                 //verification code does exist in the database and active is at 1 allready
                $json = 2;
            }
	    }
        echo json_encode($json);
    }


