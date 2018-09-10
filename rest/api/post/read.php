<?php 
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    $database = new Database();
    $db = $database->connect();

    $post = new Post($db);

    $result = $post->read();

    $num = $result->rowCount();

    if($num > 0){
        $posts_arr = array();
        $posts_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $post_item = array(
                'bookid' => $bookid,
                'id' => $userid,
                'name' => $name,
                'username' => $username,
                'email' => $email,
                'time' => $time,
                


            );

            //PUSH TO THE DATA
            array_push($posts_arr['data'], $post_item);
        }
        //turn to json

        echo json_encode($posts_arr);
    }else{
        echo 'no users';
    }