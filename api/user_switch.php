<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once './config/Database.php';
    include_once './Users.php';


            $database = new Database();
            $db = $database->connect();
            
            $user = new Users($db);
            $request_method=$_SERVER["REQUEST_METHOD"];
            switch($request_method)
            {
                case 'GET':
                    // Retrive users
                        $username = ($_GET["username"]);
                        $password = ($_GET["password"]);

                        $result = $user->get_users($username, $password);

                        $num = $result->rowCount();
                        //$user_result = $user->get_users($user_id);
                        $posts_arr = array();
                        //while($user_row = $user_result->fetch(PDO::FETCH_ASSOC)){
                        while($user_row = $result->fetch(PDO::FETCH_ASSOC)){
                            extract($user_row);
                            $posts_arr = array(
                                'userid' => $userid,
                                'usertype' => $usertype,
                                'count' => $num,
                                'name' => $name
                            );
                        };

                        $posts_arr['data'] = array();

       
                        while($row = $result->fetch(PDO::FETCH_ASSOC)){
                            extract($row);
                
                            $post_arr = array(
                                'userid' => $userid
                            );
                
                            //PUSH TO THE DATA
                            array_push($posts_arr['data'], $post_arr);
                        }
                        //turn to json
                
                        echo json_encode($posts_arr);
                   
                   
                    break;
                case 'POST':
                echo 'post';

                    // Insert user
                    insert_user();
                    break;
                case 'PUT':
                echo 'put';

                    // Update user
                    $user_id=intval($_GET["user_id"]);
                    //update_user($user_id);
                    break;
                case 'DELETE':
                echo 'delete';

                    // Delete user
                    $user_id=intval($_GET["user_id"]);
                   // delete_user($user_id);
                    break;
                default:

                echo 'default';
                    // Invalid Request Method
                    header("HTTP/1.0 405 Method Not Allowed");
                    break;
            }

?>