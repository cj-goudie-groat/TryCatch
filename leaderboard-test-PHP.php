<?php 

$db = mysqli_connect("localhost", "root","123123") or
	die(mysqli_connect_error());

mysqli_select_db($db, "comp2910") or 
	die(mysqli_error($db));
	
mysqli_query("
INSERT INTO scores(id, username, score)VALUES(
	1,
	'albert',
	100
)") or die(mysqli_error($db));

mysqli_query("
INSERT INTO scores(id, username, score)VALUES(
	2,
	'd\'arcy',
	1
)") or die(mysqli_error($db));

mysqli_query("
UPDATE scores set score=2 WHERE id=2 LIMIT 1") or die(mysqli_error($db));


/*
+----+----------+-------+
| id | username | score |
+----+----------+-------+
|  1 | albert   |   100 |
|  2 | d'arcy   |     2 |
+----+----------+-------+
*/
$result = mysqli_query("
SELECT * FROM scores ORDER BY username") or die(mysqli_error($db));

while($row = mysqli_fetch_assoc($result)){
	foreach($row as $key=>$value){
		echo $key . " is " . $value . "\n";		
	}
	echo "\n\n\n";
}
/*
id is 1
username is albert 
score is 100



id is 2
username is d'arcy 
score is 2*/