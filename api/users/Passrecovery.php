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
            $q2 = 'UPDATE users SET verification_code_lost_password = ? WHERE email = ?';
            $stmt = $db->prepare($q2);
            $stmt->bindParam(1, $verificationCode);
            $stmt->bindParam(2, $email);
            $stmt->execute();
          
            send_passrecovery_mail($email, $verificationCode);

           
        }
		
    }
    

    function send_passrecovery_mail($email, $verificationCode){
       
		
		// send the email verification
        $verificationLink = "https://www.bibli.co.il/passwordrecoveryedit/" . $verificationCode;

        $Mail_template = new MailTemplates();
        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 1;                      // Enable verbose debug output
            //$mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = '88.99.217.197';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = false;                                   // Enable SMTP authentication
            $mail->CharSet = 'UTF-8';                                
            $mail->Port       = 587;       
            $mail -> AddAddress($email);                            // TCP port to connect to
        
            //Recipients
            $mail->setFrom('donotreplay@bibli.co.il', 'ביבלי');
            $mail->isHTML(true);
            $mail->Subject = "שחזור סיסמה | ביבלי";
            $mail->Body = $Mail_template->password_recovery_mail($verificationLink);
            $mail->send();

        

            // tell the user a verification email were sent
        
            echo json_encode(array('mailexists' => 1, 'email'=> $email));
        
        } catch (Exception $e) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        }

/*
		$htmlStr = "";
		$htmlStr .= "היי " . $username . ",<br /><br />";

		$htmlStr .= "נא לחץ על הכפתור כדי לשחזר את סיסמת הכניסה שלך לאתר.<br /><br /><br />";
		$htmlStr .= "<a href='{$verificationLink}' target='_blank' style='padding:1em; font-weight:bold; background-color:blue; color:#fff;'>שחזור סיסמה</a><br /><br /><br />";

		$htmlStr .= "בהצלחה!,<br />";
		$htmlStr .= "<a href='https://www.bibli.co.il/' target='_blank'>ביבלי</a><br />";


		$name = "צוות ביבלי";
		$email_sender = "no-reply@bibli.co.il";
		$subject = "שחזור סיסמה | ביבלי";
		$recipient_email = $email;

		$headers  = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
		$headers .= "From: {$name} <{$email_sender}> \n";

		$body = $htmlStr;
	
		if(mail($recipient_email, $subject, $body, $headers)){

			// tell the user a verification email were sent
		
        echo json_encode(array('mailexists' => 1, 'email'=> $email));
        };
        
        */

    }


    function edit_password($db, $data){
        $data = json_decode($data);	
		
        if(isset($data->token)) $token = $data->token; else  $token = null;
        if(isset($data->password)) $password = password_hash($data->password, PASSWORD_DEFAULT); else  $password = null;
	
        $q = 'UPDATE users SET password = ? WHERE verification_code_lost_password = ?';
        $stmt = $db->prepare($q);
        $stmt->bindParam(1, $password);
        $stmt->bindParam(2, $token);
        $stmt->execute();
        $count = $stmt->rowCount();

        if($count != 0){
            echo json_encode(array('password_changed' => 1));
        }
        

        
      
    };