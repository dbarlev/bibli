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
		
		//$data = json_decode(file_get_contents('php://input'));	
		//if(isset($data->email)) $email = $data->email; else  $email = null;

		//$email = "davseveloff@gmail.com";
        switch($request_method)
		{
			case 'POST':
				get_iframe($db);
				break;
			case 'GET':
				recive_payment_data($db);
				break;
			case 'DELETE':
			
				break;
			case 'PUT':
			
				break;
		
		}
	}
	
	
	function get_iframe($db){
		$data = json_decode(file_get_contents('php://input'));
		if(isset($data->price)) $package_price = $data->price; else  $package_price = '80';
		if(isset($data->email)) $email = $data->email; else  $email = null;
		if(isset($data->annual)) $annual = $data->annual; else  $annual = null;
		$description = 'Student package';

		

		switch($package_price){

		}
		// $package_name = 'החבילה המשתלמת ביותר עבור סטודנטים';

		$data = "{
			\"Key\": \"a908debc4f05f424e8fee6fa92fb4e74e309c66a0dde138504eb9c722a799c5e\",
			\"Local\": \"He\",
			\"UniqueId\": '$email',
			\"SuccessUrl\": \"http://stage.bibli.co.il/succeessurl\",
			\"CancelUrl\": \"\",
			\"CallbackUrl\": \"https://www.bibli.co.il/api/users/receivePayment.php\",
			\"PaymentType\": \"regular\",
			\"CreateInvoice\": \"false\",
			\"AdditionalText\": \"\",
			\"ShowCart\": \"true\",
			\"Installments\": {
				Type: \"regular\" , 
				MinQuantity: \"1\",
				MaxQuantity: \"12\"
			},
			\"Customer\": {
				\"Email\": \"dav@gmail.com\",
				\"Name\": \"\" ,
				\"PhoneNumber\":  \"\",
				\"Attributes\": {
					\"HolderId\":  \"none\" ,
					\"Name\":  \"required\" ,
					\"PhoneNumber\":  \"required\" ,
					\"Email\":  \"optional\"
				}
			},
		   \"CartItems\": [{
				\"Description\": '$description', 
				\"Amount\": '$package_price',
				\"Currency\": \"ILS\",
				\"Name\": \" חבילת סטודנט \",
				\"Quantity\": 1 ,
				\"Image\": \"https://bibli.co.il/static/media/bibli-logo.5af20d79.png\" ,
				\"IsTaxFree\":  \"false\"
			}";

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://pci.zcredit.co.il/webcheckout/api/WebCheckout/CreateSession");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		  "Content-Type: application/json; charset=utf-8"
		));
		
		$response = curl_exec($ch);
		
		//turn the blok bellow to see curl errors

		// if (!$response) {
		// 	//print 'Error Posting JSON: ' . curl_error($ch) . '(' . curl_errno($ch) . ')';
		// 	echo 'dav '. curl_error($ch);

		// 	curl_close($ch);
		// 	return;
		//    }
		   
		curl_close($ch);
		
		$new =json_decode($response);
		
		echo $new->Data->SessionUrl;
		
	};


	function recive_payment_data($db){
        
        
		if(isset($data->Total)) $total = $data->Total; else  $total = 'null';
		if(isset($data->UniqueID)) $email = $data->UniqueId; else  $email = null;
		if(isset($data->CustomerEmail)) $payemail = $data->CustomerEmail; else  $payemail = null;
		$paymenttime = time();


		mail("davseveloff@gmail.com","bibli payment receives", var_export($_GET, true));

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
	}

?>