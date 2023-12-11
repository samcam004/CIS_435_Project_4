<?php
    
    header("Content-Type:application/json");

    //store data from body
    $data = file_get_contents("php://input");
    $newData = json_decode($data, true);

    //make var for query
    $type = $newData[0];
    $input = $newData[1];
   
    //connect to database
    $mysqli = mysqli_connect("localhost", "adminuser", "admin", "bookstoredb");

    //check connection
    if(mysqli_connect_error()){
        echo "Failed to connect to maria Db" . $mysqli->connect_error;

        die("error connecting");
    }

    //insert statement
    $sql = "SELECT * FROM books WHERE {$type} = '{$input}'";
    
    $result = mysqli_query($mysqli, $sql);

    //get all records
    $row = mysqli_fetch_all($result);

    //set data = to json of data
    $data = json_encode($row);
    
    echo $data;

    $mysqli->close();

    
    
?>
