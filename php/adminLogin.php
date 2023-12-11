<?php
    //get username and password
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);


    $mysqli = mysqli_connect("localhost", "adminuser", "admin", "bookstoredb");

    //check connection
    if(mysqli_connect_error()){
        echo "Failed to connect to maria Db" . $mysqli->connect_error;

        die("error coenncting");
    }


    //insert statement

    $sql = "SELECT *FROM accounts WHERE Username = '{$username}' AND Password = '{$password}' AND Type = '0';";

    $result = mysqli_query($mysqli, $sql);

    if (mysqli_num_rows($result) === 1) {
        header("Location: http://localhost/CIS_435_Project_4/admin/admin.html");
    }


    else{
        echo("Invalid");
    }

    $mysqli->close();

    
?>