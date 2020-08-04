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
				
				$userid = $_GET["userid"];
				if($_GET["page"] = "userdata"){
					get_user_data_for_details_page($db, $userid);
				}else{
					get_user_data($db, $userid);
				}
				
				break;
			case 'POST':
				return set_user_data($db);
				break;
			case 'DELETE':
				delete_user($db);
				break;
			case 'PUT':
				$userid = ($_GET["userid"]);
				update_user($db, $userid);
				break;
		
		}
    }
	
    function get_user_data($db, $email = null, $userid = null)
    {
		
			$query = 'SELECT * FROM users WHERE (email = ?) OR (userid = ?)';				
			$stmt = $db->prepare($query);
			$stmt->bindParam(1, $email);
			$stmt->bindParam(2, $userid);
			$stmt->execute();
		
		
		$records_row = $stmt->fetch(PDO::FETCH_ASSOC);
		
		echo json_encode(
			array(
				'userid' => $records_row['userid'],
				'userRegistered' => '1',
				'username'=> 'records_row',
				'email'=> $records_row['email']
			 ));
	
		echo json_encode($records_row);
	}
	
	/*
	Shows the number of bibs and lists pre user
	called by get_user_data function
	*/

    function get_user_data_for_details_page($db, $userid)
	{
		

		$query = 'SELECT * FROM users WHERE userid = ?';				
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $userid);
		$stmt->execute();


		$records_row = $stmt->fetch(PDO::FETCH_ASSOC);
		
		$nums = bibs_and_lists($db, $userid);

		echo json_encode(
			array(
				'userid' => $records_row['userid'],
				'userRegistered' => '1',
				'username'=> 'records_row',
				'email'=> $records_row['email'],
				'fname'=> $records_row['fname'],
				'lname'=> $records_row['lname'],
				'mosad'=> unserialize($records_row['mosad']),
				'maslul'=> unserialize($records_row['maslul']),
				'numOfBibs'=> $nums['num_of_bibs'],
				'numOfLists'=> $nums['num_of_lists'],
				
			));
		
			return json_encode($records_row);
    }
    
    	/*
	Shows the number of bibs and lists pre user
	called by get_user_data function
	*/
	function bibs_and_lists($db, $userid){



		$user_Items_query = 'SELECT COUNT(userid) AS numofItems FROM refactor_books_new WHERE userid = ? ';				
		$user_Items_stmt = $db->prepare($user_Items_query);
		$user_Items_stmt->bindParam(1, $userid);
		$user_Items_stmt->execute();
		$records_num_of_Items = $user_Items_stmt->fetch(PDO::FETCH_ASSOC);
		$num_of_Items = $records_num_of_Items['numofItems'];


		$user_bib_query = 'SELECT COUNT(Userid) AS numoflists FROM biblist WHERE userid = ? ';				
		$user_bib_stmt = $db->prepare($user_bib_query);
		$user_bib_stmt->bindParam(1, $userid);
		$user_bib_stmt->execute();
		$records_num_of_lists = $user_bib_stmt->fetch(PDO::FETCH_ASSOC);
		$num_of_lists = $records_num_of_lists['numoflists'];

		$nums = array('num_of_bibs' => $num_of_Items, 'num_of_lists' => $num_of_lists);
		return($nums);

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
		if(isset($data->password)) $password = password_hash($data->password, PASSWORD_DEFAULT); else  $password = null;
		if(isset($data->package)) $package = $data->package; else  $package = null;
		$regtime = time();
		$verificationCode = md5(uniqid($email, true));

		$Mail_template = new MailTemplates();

		$verificationCode = $Mail_template->token_creator($email);

		//check if mail already exists in the database
		$q = 'SELECT * FROM users WHERE email = ?';
		$res = $db->prepare($q);
		$res->bindParam(1, $email);
		$res->execute();
		
		//validation:
		if(strlen($data->password) < 6){
			echo json_encode(array('error' => 0, 'username'=> $username, 'email'=> $email));
		}else if($data->email == null){
			echo json_encode(array('error' => 1, 'username'=> $username, 'email'=> $email));

		//if emailis valid or not
		}else if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
			echo json_encode(array('error' => 2, 'username'=> $username, 'email'=> $email));

		//if mail already exists
		}else if($res->fetchColumn()){
			echo json_encode(array('error' => 3, 'userRegistered' => 'exists', 'username'=> $username, 'email'=> $email));
			
		}else{

			$query = "INSERT INTO users
						(usertype, name, username, password, email,verification_code, subscription, regtime) 
						VALUES (?,?,?,?,?,?,?, ?)";
						
			$stmt = $db->prepare($query);
			$stmt->bindParam(1, $usertype);
			$stmt->bindParam(2, $name);
			$stmt->bindParam(3, $username);
			$stmt->bindParam(4, $password);
			$stmt->bindParam(5, $email);
			$stmt->bindParam(6, $verificationCode);
			$stmt->bindParam(7, $package);
			$stmt->bindParam(8, $regtime);
			

			$stmt->execute();
			$Mail_template = new MailTemplates();
			
			//$Mail_template->send_conf_mail_to_user($email, $verificationCode);
			//echo json_encode(array('userRegistered' => 'success', 'username'=> '', 'email'=> $email));
			get_user_data($db, $email);
			
		}
		
	}
	

	function userdata_select_on_page_load($db, $userid)
	{
		

		$query = 'SELECT * FROM users WHERE userid = ?';				
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $userid);
		$stmt->execute();
		

		$records_row = $stmt->fetch(PDO::FETCH_ASSOC);
	}

	

    function deleteRecordFromUser($db)
    {
		$userid = ($_GET["userid"]);
		$recordID = ($_GET["recordID"]);
		
		$query = 'UPDATE refactor_books SET userid = 9000 WHERE bookid = ?';
							
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $recordID);
		$stmt->execute();

		get_user_data($db, $userid);
	}
	

	
	function mail_validation($db, $email){

		//check if mail already exists in the database
		$q = 'SELECT * FROM users WHERE email = ?';
		$res = $db->prepare($q);
		$res->bindParam(1, $email);
		$res->execute();

		//if emial is empty
		if($email == null || empty($email) ){
			$error =  json_encode(array('error' => 1));

		//if emailis valid or not
		}else if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
			$error =  json_encode(array('error' => 2));

		//if mail already exists
		}else if($res->fetchColumn()){
			$error = json_encode(array('error' => 3));
		
		//no error
		}else {
			$error = json_encode(array('error' => 0));
		}
		return $error;
	}

	



	function update_user($db, $userid)
	{	
		$data = json_decode(file_get_contents('php://input'));	

		if( isset($data->fname) && !empty($data->fname)) $fname = $data->fname;
		if( isset($data->lname) && !empty($data->lname)) $lname = $data->lname;
		if( isset($data->email)) $email = $data->email;
		if( isset($data->mosad) && !empty($data->mosad))$mosad = serialize($data->mosad);
		if( isset($data->maslul) && !empty($data->maslul)) $maslul = serialize($data->maslul);
			
		$mail_val = mail_validation($db, $email);

			// if(!isset($mail_val)){
	
		$query = "UPDATE users
		SET fname = :fname, lname = :lname, email = :email, mosad = :mosad, maslul = :maslul
		WHERE userid = :userid";
		
		$stmt = $db->prepare($query);
		$stmt->bindParam(':fname', $fname);
		$stmt->bindParam(':lname', $lname);
		$stmt->bindParam(':email', $email);
		$stmt->bindParam(':mosad', $mosad);
		$stmt->bindParam(':maslul', $maslul);
		$stmt->bindParam(':userid', $userid);



		$stmt->execute();

		get_user_data($db, null, $userid);

	// }

	}

?>