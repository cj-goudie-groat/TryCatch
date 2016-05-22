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
?>