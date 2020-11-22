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
		if($request_method == 'POST')
        {
			handleSuccessPayment($db);
		}
	}
	
	function handleSuccessPayment($db){
		$data = json_decode(file_get_contents('php://input'));
        
		if(isset($data->Total)) $total = $data->Total; else  $total = 'null';
		if(isset($data->UniqueID)) $email = $data->UniqueID; else  $email = null;
		if(isset($data->CustomerEmail)) $payemail = $data->CustomerEmail; else  $payemail = null;
		$paymenttime = time();

		switch($total){
			case '80': 
				$package = 1;
				break;
			case '120': 
				$package = 2;
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
		
		mail("dbarlev1@gmail.com","bibli payment receive test", $email);
	}
?>