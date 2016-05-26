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

$name = $_POST["initials"]; 
$currentScore = $_POST["final-score"]; 
$gametype = $_POST["gametype"];

if ($gametype == "spelling") {
	$sql = "INSERT INTO sp_hs (sp_name, sp_score) VALUES ('$name', '$currentScore')"; 
} elseif ($gametype == "math") {
	$sql = "INSERT INTO math_hs (math_name, math_score) VALUES ('$name', '$currentScore')"; 
} else {
	$sql = "INSERT INTO sp_hs (sp_name, sp_score) VALUES ('LEK', '69420')"; 
}

if ($conn->query($sql) === TRUE) { 
    echo "Score Submitted. "; 
} else { 
    echo "Error: " . $sql . "<br>" . $conn->error; 
} 

$conn->close(); 
header('Location: http://trycatchbeta.netai.net/'); 
?> 
	