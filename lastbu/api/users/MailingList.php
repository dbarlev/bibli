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
                break;
            case 'POST':
                add($db);
				break;
            case 'PUT':
                break;
			case 'DELETE':
                break;
            case 'OPTIONS':
				break;
			default:
				break;
		}
    }
    
    
    function add($db) {
        $data = json_decode(file_get_contents('php://input'));	
	    if(isset($data->username)) $username = $data->username; else  $username = null;
	    if(isset($data->name)) $name = $data->name; else  $name = null;
        if(isset($data->email)) $email = $data->email; else  $email = null;
        if(isset($data->checked)) $checked = $data->checked; else  $checked = null;
        
        if(trim($name) == "" || trim($email) == "")
        {
           echo json_encode(400); // status code 400 bad request
        }
        else 
        {
            $select = "SELECT * from mailinglist
                    WHERE email = ?";

            $row = $db->prepare($select);
            $row->bindParam(1, $email);
            $row->execute();
            $result = $row->rowCount();
            
            if($result > 0)
            {
                echo json_encode(409); // status code 409 conflict
            }
            else 
            {
                $query = "INSERT INTO mailinglist
                            (username, name, email, mailinglist) 
                                VALUES (?, ?, ?, ?)";
                                
                $stmt = $db->prepare($query);
                $stmt->bindParam(1, $username);
                $stmt->bindParam(2, $name);
                $stmt->bindParam(3, $email);
                $stmt->bindParam(4, $checked);
                $stmt->execute();
                echo json_encode(200); // status code 200 OK
            } 
        }
        
    }
?>

  