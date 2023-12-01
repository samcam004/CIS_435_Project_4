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

// If server request is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Decode JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    // Check if JSON decoding was successful
    if($data !== NULL){

        // Grabbing data from JSON
        $newISBN = isset($data->ISBN) ? intval($data->ISBN) : 0; // Set ISBN to 0 if can't find one
        $newName = $data->name ?? '';   // Set name to blank if can't find one
        $newAuthor = $data->author ?? '';  // Set author to blank if can't find one
        $newPrice = isset($data->price) ? intval($data->price) : 0; // Set price to 0 if can't find one

        // Preparing SQL query 
        $sql = "INSERT INTO $table (ISBN, Name, Author, Price) VALUES (?, ?, ?, ?)";
        $query = $connection->prepare($sql);

        // Executing query
        $query->bind_param("issi", $newISBN, $newName, $newAuthor, $newPrice);
        if ($query->execute()) {
            $response = array("success" => true, "message" => "New Book added to the Database Successfully!");
            echo json_encode($response);
            // Closing the query
            $query->close();
            die();
        } 

        // If query fails 
        else {
            $response = array("success" => false, "message" => "Failed to add book to the Database!");
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