<?php

    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);
    $email = htmlspecialchars($_POST['email']);


    $mysqli = mysqli_connect("localhost", "adminuser", "admin", "bookstoredb");

    //check connection
    if(mysqli_connect_error()){
        echo "Failed to connect to maria Db" . $mysqli->connect_error;

        die("error coenncting");
    }

    //first check if admin
    //then check if user exist

    //insert statement
    $sql = "INSERT INTO accounts (Username, Password, Type, Email) VALUES ('{$username}', '{$password}' , '1', '{$email}' );";

    mysqli_query($mysqli, $sql);

    header("Location: http://localhost/projects/project4/wishlist.php?x=$username&y=$password");

    $mysqli->close();

    
?>