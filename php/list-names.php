<?php

//This is where it prints out the name
//Refreshes the list to order the top 10
$sql = "SELECT * FROM sp_hs ORDER by sp_score DESC LIMIT 10";
$result = $conn->query($sql);
  if ($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
          echo $row["sp_name"]."<br>";
      }
  }
?>