<?php 
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    $database = new Database();
    $db = $database->connect();

    $post = new Post($db);


    //get the id from the url
    $post->userid = isset($_POST['userid']) ? $_POST['userid'] : 'no var';

    //get post
    //$post->read_single();
    $post->get_all_bibs_by_user();

    $result = $post->get_all_bibs_by_user();
   
   
    
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
                'userid' => $userid,
                'bookid' => $bookid,
                'bibidbook' => $bibidbook,
              

            );

            //PUSH TO THE DATA
            array_push($posts_arr['data'], $post_arr);
        }
        //turn to json

        echo json_encode($posts_arr);
    }else{
        echo 'no users';
    }
    // /*/*/    
    // $result = $post->read();

    // $num = $result->rowCount();

    // if($num > 0){
    //     $posts_arr = array();
    //     $posts_arr['data'] = array();

    //     while($row = $result->fetch(PDO::FETCH_ASSOC)){
    //         extract($row);

    //         $post_item = array(
    //             'bookid' => $bookid,
    //             'id' => $userid,
    //             'name' => $name,
    //             'username' => $username,
    //             'email' => $email,
    //             'time' => $time,
                


    //         );

    //         //PUSH TO THE DATA
    //         array_push($posts_arr['data'], $post_item);
    //     }
    //     //turn to json

    //     echo json_encode($posts_arr);
    // }else{
    //     echo 'no users';
    // }