<?php 
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    $database = new Database();
    $db = $database->connect();

    $post = new Post($db);

// var_dump($_POST);
    //get the id from the url
    $post->username = isset($_GET['username']) ? $_GET['username'] : 'no var';
    $post->password = isset($_GET['password']) ? $_GET['password'] : 'no var';

    //get post
    //$post->read_single();
    $post->login();

    $result = $post->login();
   
   
    
    $num = $result->rowCount();





    $user_result = $post->read_single();
    $posts_arr = array();
    while($user_row = $user_result->fetch(PDO::FETCH_ASSOC)){
        extract($user_row);
        $posts_arr = array(
            'userid' => $userid,
            'count' => $num,
            'name' => $name
        );
    };





    if($num > 0){
       
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
    }else{
        echo 'no users';
    }