<?php 

    $servername = "mysql13.000webhost.com";
    $username = "a5796219_admin";
    $password = "ilikepie123";
    $dbname = "a5796219_hs";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    $sql = "SELECT * FROM high_score ORDER by score DESC LIMIT 10";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "Name: " . $row["name"]. "\t" . $row["score"]. "<br>";
        }
    } else {
        echo "0 results";
    }
    $conn->close();
?>