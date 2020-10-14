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
	
		// $data = json_decode(file_get_contents('php://input'));	
		// if(isset($data->price)) $package_price = $data->price; else  $package_price = null;
		// if(isset($data->userid)) $userid = $data->userid; else  $userid = null;
		// $x = 'my ass';
		$package = '120';
		// $y = '321';
		
		// $package_name = 'החבילה המשתלמת ביותר עבור סטודנטים';
	
		

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, "https://pci.zcredit.co.il/webcheckout/api/WebCheckout/CreateSession");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		
		curl_setopt($ch, CURLOPT_POSTFIELDS, "{
			\"Key\": \"a908debc4f05f424e8fee6fa92fb4e74e309c66a0dde138504eb9c722a799c5e\",
			\"Local\": \"He\",
			\"UniqueId\": \"1\",
			\"SuccessUrl\": \"http://davdev.co.il/post/post.php\",
			\"CancelUrl\": \"\",
			\"CallbackUrl\": \"http://davdev.co.il/post/post.php\",
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
				\"Email\": \"davseveloff@gmail.com\",
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
				\"Description\": \"תיאור החבילה\", 
				\"Amount\": $package,
				\"Currency\": \"ILS\",
				\"Name\": \" חבילת סטודנט \",
				\"Quantity\": 1 ,
				\"Image\": \"https://bibli.co.il/static/media/bibli-logo.5af20d79.png\" ,
				\"IsTaxFree\":  \"false\"
			}");
		
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
		$data = json_decode(file_get_contents('php://input'));	
		if(isset($data->Total)) $total = $data->Total; else  $total = null;
		if(isset($data->CustomerEmail)) $email = $data->CustomerEmail; else  $email = null;
		if(isset($data->UniqueID)) $userid = $data->UniqueID; else  $userid = null;
		if(isset($data->CustomerEmail)) $payemail = $data->CustomerEmail; else  $payemail = null;
		$paymenttime = time();

		switch($total){
			case '80.0': 
				$package = 1;
				break;
			case '120.0': 
				$package = 3;
				break;
			default: 
				$package = 0;
				break;

		}


		$query = "UPDATE users SET Package = ?, paytime = ?, payemail = ? 
		WHERE userid = ?";
		
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $package);
		$stmt->bindParam(2, $paymenttime);
		$stmt->bindParam(3, $payemail);
		$stmt->bindParam(4, $userid);

		$stmt->execute();
	}

?>