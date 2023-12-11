<?php
    
    header("Content-Type:application/json");

    //store data from body
    $data = file_get_contents("php://input");
    $newData = json_decode($data, true);

    //make var for query
    $username = $newData[0];
    $ISBN = $newData[1];

    //connect to database
    $mysqli = mysqli_connect("localhost", "adminuser", "admin", "bookstoredb");

    //check connection
    if(mysqli_connect_error()){
        echo "Failed to connect to maria Db" . $mysqli->connect_error;

        die("error coenncting");
    }

    //insert statement
    $sql = "INSERT INTO wishlist (ID, Username, ISBN) VALUES (NULL, '{$username}' , '{$ISBN}' );";

    mysqli_query($mysqli, $sql);

    $mysqli->close();

    
    
?>
