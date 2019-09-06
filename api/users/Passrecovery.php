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
                pass_recovery($db);
				break;
            case 'PUT':
                $data = ($_GET['data']);
                edit_password($db, $data);
				break;
			case 'DELETE':
                break;
            case 'OPTIONS':
				break;
			default:
				break;
		}
    }
    

    function pass_recovery($db)
	{
        $email = ($_GET["email"]);

        $q1 = "SELECT * FROM users WHERE email = ?";
        $res1 = $db->prepare($q1);
		$res1->bindParam(1, $email);
        $res1->execute();
        $res = $res1->rowCount();
        if(!$res){
            //verification code does not exist in the database
            echo json_encode(array('mailexists' => 0, 'email'=> $email));

         
        }else{
            
            $verificationCode = md5(uniqid($email, true));
            $q2 = 'UPDATE users SET verification_code = ? WHERE email = ?';
            $stmt = $db->prepare($q2);
            $stmt->bindParam(1, $verificationCode);
            $stmt->bindParam(2, $email);
            $stmt->execute();

            send_passrecovery_mail($email, $verificationCode);

            echo json_encode(array('mailexists' => 1, 'email'=> $email));
        }
		
    }
    

    function send_passrecovery_mail($email, $verificationCode){
        echo $email;
    }


    function edit_password($db, $data){
        $data = json_decode($data);	

		var_dump($data);
		if(isset($data->token)) $token = $data->token; else  $token = null;
		if(isset($data->password)) $password = $data->password; else  $password = null;
	
        echo $token;
        echo $password;
    };