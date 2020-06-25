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
				
				break;
		
		}
    }


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
				'mosad'=> $records_row['mosad'],
				'maslul'=> $records_row['maslul'],
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
