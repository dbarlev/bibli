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
                $userid = ($_GET["userid"]);
				get_user_data_for_details_page($db, $userid);
				break;
			case 'POST':
			
				break;
			case 'DELETE':
			
				break;
			case 'PUT':
				update_user($db);
				break;
		
		}
    }





	function update_user($db)
	{	
		$data = json_decode(file_get_contents('php://input'));	

		if( isset($data->fname) && !empty($data->fname)) $fname = $data->fname;
		if( isset($data->lname) && !empty($data->lname)) $lname = $data->lname;
		if( isset($data->email) && !empty($data->email)) $email = $data->email;
		if( isset($data->mosad) && !empty($data->mosad))$mosad = $data->mosad;
		if( isset($data->maslul) && !empty($data->maslul)) $maslul = $data->maslul;
			
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