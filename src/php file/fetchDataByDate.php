<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credential: true ");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, HEAD, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Origin, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=UTF-8");

include '_db.php';

$arr=array();
$date=$_GET['dates'];
// $datses=$_P['dates'];
$stmt = $db->prepare("SELECT * FROM mytable WHERE Date ='$date' ORDER BY NoOfCases DESC");
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $data = array();
    $states=array();
    $caseArray=array();
    $total=0;
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($states,$row['State']);
        array_push($caseArray, (int)$row['NoOfCases']);
        array_push($data, $row);
        $total=$total+$row['NoOfCases'];
    }
    $arr['caseArray']=$caseArray;
    $arr['state']=$states;
    $arr['total']=$total;
    $arr['val']=$data;
    $arr['count']=$stmt->rowCount();
}


echo json_encode($arr,JSON_PRETTY_PRINT);
?>