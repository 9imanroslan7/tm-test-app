 <?php
    try {
        // $db = new PDO("mysql:host=localhost;dbname=mytable",'root','');
        $db = new PDO("mysql:host=localhost;dbname=mydb",'root','');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //echo "success";
    } catch(PDOException $e) {
        echo $e->getMessage();
    }
    
    // echo 787329;
    // date_default_timezone_set('Asia/Kuala_Lumpur');
    // $today = date("Y-m-d H:i:s");

    // if (isset($_SERVER['HTTP_ORIGIN'])) {
    //     header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    //     header('Access-Control-Allow-Credentials: true');
    //     header('Access-Control-Max-Age: 86400');
    // }
    // if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    //     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
    //         header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    //     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
    //         header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    //     exit(0);
    // }
    $request_raw = file_get_contents("php://input");
    $request = json_decode($request_raw, true);
?>