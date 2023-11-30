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



?>