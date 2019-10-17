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
				return set_user_data($db);
				break;
			case 'DELETE':
				delete_user($db);
				break;
			case 'PUT':
				update_user($db);
				break;
		
		}
    }
	
    function getRecords($db, $email)
    {
		 $query = 'SELECT * FROM users WHERE email = ?';				
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $email);
		$stmt->execute();
		

		$records_row = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		// var_dump($records_row);
		// foreach(  $records_row as $key => &$value )
		// {
		// 	// $records_row[$key]["wFname"] = unserialize($value["wFname"]);
		// 	// $records_row[$key]["wLname"] = unserialize($value["wLname"]);
			
		// }

		echo json_encode(array('userRegistered' => '1', 'username'=> 'records_row', 'email'=> $email));
		unset($value);
		// echo json_encode($records_row);
    }

	function check_if_users_with_same_mail($db, $email)
	{	
		$query = 'SELECT * FROM users WHERE email = ?';
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $email);
		$stmt->execute();
		return (bool)$stmt->fetchColumn();
	}

    function set_user_data($db)
    {
		
		$data = json_decode(file_get_contents('php://input'));	

		$usertype = 9;
		if(isset($data->name)) $name = $data->name; else  $name = null;
		if(isset($data->email)) $email = $data->email; else  $email = null;
		if(isset($data->username)) $username = $data->username; else  $username = null;
		if(isset($data->password)) $password = $data->password; else  $password = null;
		if(isset($data->package)) $package = $data->package; else  $package = null;
		
		$verificationCode = md5(uniqid($email, true));

		//check if mail already exists in the database
		$q = 'SELECT * FROM users WHERE email = ?';
		$res = $db->prepare($q);
		$res->bindParam(1, $email);
		$res->execute();
		
		if($res->fetchColumn()){
			echo json_encode(array('userRegistered' => 'exists', 'username'=> $username, 'email'=> $email));
			
		}else{

			$query = "INSERT INTO users
						(usertype, name, username, password, email,verification_code, subscription) 
						VALUES (?,?,?,?,?,?,?)";
						
			$stmt = $db->prepare($query);
			$stmt->bindParam(1, $usertype);
			$stmt->bindParam(2, $name);
			$stmt->bindParam(3, $username);
			$stmt->bindParam(4, $password);
			$stmt->bindParam(5, $email);
			$stmt->bindParam(6, $verificationCode);
			$stmt->bindParam(7, $package);
			

			$stmt->execute();
			send_conf_mail_to_user($email);
			getRecords($db, $email);
		}
		
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
	

	
	function send_conf_mail_to_user($email){
		// generate verification code, acts as the "key"
		$verificationCode = md5(uniqid($email, true));
		
		// send the email verification
		$verificationLink = "https://bibli.co.il/mailconf/" . $verificationCode;

		$htmlStr = "";
		$htmlStr .= "היי <br /><br />";

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

		// send email using the mail function, you can also use php mailer library if you want
		if( mail($recipient_email, $subject, $body, $headers) ){

			// tell the user a verification email were sent
			echo "<div id='successMessage'>מייל אישור נשלח ל<b>" . $email . "</b>, בבקשה פתחו את המייל ולחצו על כפתור האישור.</div>";


		}
	}


?>