<?php

//This is where it prints out the name
//Refreshes the list to order the top 10
	$sql = "SELECT * FROM math_hs ORDER by math_score DESC LIMIT 10";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
	    // output names for the top 10
	    while($row = $result->fetch_assoc()) {
	    	echo $row["math_name"]."<br>";
	    }
	}
?>


