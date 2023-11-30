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

// Creating SQL query 
$sql = "SELECT * FROM $table";
// Executing query
$result = $connection->query($sql);

if($result->num_rows > 0){

    // Fetching data from DB and storing it in an array
    $books = array();
    while($row = $result->fetch_assoc()){
        $donuts[] = $row;
    }

    // Convert data to JSON and output 
    $json = json_encode($donuts, JSON_PRETTY_PRINT);
    header('Content-Type: application/json');
    echo $json;

}

// If no data is returned
else{
    echo "No books found in DB";
}

// Closing the connection 
$connection->close();

?>