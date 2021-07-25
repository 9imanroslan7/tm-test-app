<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credential: true ");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, HEAD, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Origin, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

include '_db.php';
$array=array();
$stmt = $db->prepare("SELECT DISTINCT State FROM mytable");
$stmt->execute();

if ($stmt->rowCount() > 0) {
    //$arr=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        //array_push($arr,$row['State']);
        $state=$row['State'];



        $stmt2 = $db->prepare("SELECT NoOfCases FROM mytable WHERE State = '$state'");
        $stmt2->execute();

        if ($stmt2->rowCount() > 0) {
            $cumulativeCase=0;
            $sortedData=array();
            while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                extract($row2);
                $cumulativeCase=$cumulativeCase+$row2['NoOfCases'];
            }
            //echo json_encode($cumulativeCase,JSON_PRETTY_PRINT);
            $data=array("state"=>$state,"cumu"=>$cumulativeCase);
            
        }
        array_push($array,$data);
    }
    echo json_encode($array,JSON_PRETTY_PRINT);
}


