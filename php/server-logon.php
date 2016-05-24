 <?php 
    $servername = "mysql13.000webhost.com";
    $username = "a5796219_admin";
    $password = "ilikepie123";
    $dbname = "a5796219_hs";

    // Connect to the Database
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check for a connection, and notify if one isn't found
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
?>