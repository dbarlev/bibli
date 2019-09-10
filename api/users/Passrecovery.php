<?php

    include_once '../config/Database.php';
    init();
    $GLOBAL['url'] = 'http://localhost:3000';

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
        $row = $res1->fetch(PDO::FETCH_ASSOC);
        $username = $row['username'];
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

            send_passrecovery_mail($email, $verificationCode, $username);

           
        }
		
    }
    

    function send_passrecovery_mail($email, $verificationCode, $username){
       
		
		// send the email verification
		$verificationLink = "https://bibli.co.il/passwordrecoveryedit/" . $verificationCode;

		$htmlStr = "";
		$htmlStr .= "היי " . $username . ",<br /><br />";

		$htmlStr .= "נא לחץ על הכפתור כדי לאשר את הרשמתך לאתר.<br /><br /><br />";
		$htmlStr .= "<a href='{$verificationLink}' target='_blank' style='padding:1em; font-weight:bold; background-color:blue; color:#fff;'>אשר רישום</a><br /><br /><br />";

		$htmlStr .= "בהצלחה!,<br />";
		$htmlStr .= "<a href='https://bibli.co.il/' target='_blank'>ביבלי</a><br />";


		$name = "דוד מצוות ביבלי";
		$email_sender = "no-reply@bibli.co.il";
		$subject = "אישור הרשמה | ביבלי";
		$recipient_email = $email;

		$headers  = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
		$headers .= "From: {$name} <{$email_sender}> \n";

		$body = $htmlStr;
            
        //DELETE WHEN PASSING TO PRODUVTION
        echo json_encode(array('mailexists' => 1, 'email'=> $email));


		// send email using the mail function, you can also use php mailer library if you want
		if( mail($recipient_email, $subject, $body, $headers) ){

			// tell the user a verification email were sent
		
            echo json_encode(array('mailexists' => 1, 'email'=> $email));

        }
        

    }


    function edit_password($db, $data){
        $data = json_decode($data);	
		
		if(isset($data->token)) $token = $data->token; else  $token = null;
		if(isset($data->password)) $password = $data->password; else  $password = null;
	
        $q = 'UPDATE users SET password = ? WHERE verification_code = ?';
        $stmt = $db->prepare($q);
        $stmt->bindParam(1, $password);
        $stmt->bindParam(2, $token);
        $stmt->execute();
        $count = $stmt->rowCount();

        if($count != 0){
            echo json_encode(array('password_changed' => 1));
        }
        

        
      
    };