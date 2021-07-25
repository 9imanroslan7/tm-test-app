<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credential: true ");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, HEAD, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Origin, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

include '_db.php';
$arr=array();
$query="SELECT DISTINCT Date FROM mytable";
$stmt = $db->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {

	$bookings = array();

        	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            array_push($bookings, $row);
        	}
        	$arr['val']=$bookings;
}

echo json_encode($arr,JSON_PRETTY_PRINT);



?>