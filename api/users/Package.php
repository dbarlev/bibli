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
				$userID = ($_GET["userid"]);
				get_user_pacakge($db, $userID);
				break;
			case 'POST':
				break;
			case 'DELETE':
				break;
			case 'PUT':
				break;
		
		}
    }

	function get_user_pacakge($db, $userID)
	{	
		$query = ' SELECT p.Name FROM users as u
                    inner JOIN packages as p
                    ON u.package = p.Type
                    WHERE userid = ?';
		$stmt = $db->prepare($query);
		$stmt->bindParam(1, $userID);
		$stmt->execute();
        $package = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($package);
	}

   

?>