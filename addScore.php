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
$initials = $_POST["initials"];
$currentScore = $_POST["final-score"];

$sql = "INSERT INTO high_score (name, score) VALUES ('$initials', '$currentScore')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully in the high score database";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
header('Location: http://trycatchbeta.netai.net/OstrichJetpack/');
?>

