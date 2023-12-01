<?php

// Global Variables 
$host = "localhost";
$username = "admin";
$password = "password123";
$database = "bookstoredb";
$table = "books";

// Attempting to connect to DB
$connection = new mysqli($host, $username, $password, $database);

// If connection to DB failed
if($connection->connect_error){
    die("Conection failed: ". $connection->connect_error);
}

// If server request is DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){

    // Decode JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    // Check if JSON decoding was successfull
    if($data != NULL){

        // Grabbing IBSN from JSON
        $deletedISBN = isset($data->ISBN) ? intval($data->ISBN) : 0; 

        // Preparing SQL query
        $sql = "DELETE FROM $table WHERE ISBN = ?";
        $query = $connection->prepare($sql);


        // Executing query
        $query->bind_param("i", $deletedISBN);
        if($query->execute()){
            $response = array("success" => true, "message" => "Book deleted from the Database!");
            echo json_encode($response);
            // Closing the query
            $query->close();
            die();
        }
        else{
            $response = array("success" => false, "message" => "Failed to delete book from the Database");
            echo json_encode($response);
            // Closing the query
            $query->close();
            die();
        }
        
    }

    // If JSON decoding was unsuccessfull
    else{
        $response = array("success" => false, "message" => "Invalid JSON data");
        echo json_encode($response);
        die();
    }
    
}

// Closing the DB connection
$connection->close();

?>