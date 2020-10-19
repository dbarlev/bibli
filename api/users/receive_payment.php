<?php

	require '../inc/inc.php';

    init();


    function init()
    {
		$database = new Database();
		$db = $database->connect();
		CreateHeaders();
    }

    function CreateHeaders()
    {

		header("Access-Control-Allow-Origin: *");
		header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
		header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
			
    }
    

		$request_method = $_SERVER["REQUEST_METHOD"];
		
		//$data = json_decode(file_get_contents('php://input'));	
		//if(isset($data->email)) $email = $data->email; else  $email = null;

		//$email = "davseveloff@gmail.com";
       
	
	
	

	
        $data = json_decode(file_get_contents('php://input'));
        
		if(isset($data->Total)) $total = $data->Total; else  $total = 'null';
		if(isset($data->UniqueID)) $email = $data->UniqueId; else  $email = null;
		if(isset($data->CustomerEmail)) $payemail = $data->CustomerEmail; else  $payemail = null;
		$paymenttime = time();


		//mail("davseveloff@gmail.com","bibli payment receiveג", $data);

		switch($total){
			case '80': 
				$package = 1;
				break;
			case '120': 
				$package = 3;
				break;
			default: 
				$package = 0;
				break;

		}


		$query = "UPDATE users SET package = ?, paytime = ?, paymail = ? 
		WHERE email = ?";
		
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $package);
		$stmt->bindParam(2, $paymenttime);
		$stmt->bindParam(3, $payemail);
		$stmt->bindParam(4, $email);

        $stmt->execute();
        
        

        //mail("davseveloff@gmail.com","bibli payment receives", (bool)$stmt->fetchColumn());
	

?>