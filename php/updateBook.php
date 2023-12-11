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
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// If server request is UPDATE
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    // Decode JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400); // Or whatever you want to do with this error
        die();
    }

    // Check if JSON decoding was successful
    if ($data !== NULL) {

        // Preparing SQL query 
        $sql = "UPDATE $table SET ";
        $updates = [];

        // If admin updates name 
        if (isset($data->Title)) {
            $updates[] = "Title = '" . $connection->real_escape_string($data->Title) . "'";
        }

        // If admin updates author 
        if (isset($data->Author)) {
            $updates[] = "author = '" . $connection->real_escape_string($data->Author) . "'";
        }

        // If admin updates genre 
        if (isset($data->Genre)) {
            $updates[] = "genre = '" . $connection->real_escape_string($data->Genre) . "'";
        }

        // If admin updates price  
        if (isset($data->Price)) {
            // Grabbing integer value 
            $newPrice = intval($data->Price);
            $updates[] = "price = " . $newPrice;
        }

        // Putting query together 
        $sql .= implode(', ', $updates) . " WHERE ISBN = '" . $connection->real_escape_string($data->ISBN) . "'";

        // Executing query 
        if ($connection->query($sql) === TRUE) {
            $response = array("message" => "Record updated successfully.");
            echo json_encode($response);
            die();
        } 
        // If query fails 
        else {
            $response = array("message" => "Failed to update record: " . $connection->error);
            echo json_encode($response);
            die();
        }

    } 
    // If JSON decoding was unceccessfull
    else {
        $response = array("success" => false, "message" => 'Invalid JSON data');
        echo json_encode($response);
        die();
    }
    
}

?>