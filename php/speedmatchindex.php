<?php
    // Cross-Origin Resource Sharing Header
    header('Access-Control-Allow-Origin: http://localhost:8080');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
    header('Content-Type: application/json; charset=UTF-8'); 

    if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
        @$account = $_POST["account"]; //取得 account POST 值
        if ($account != null) { //如果 account
            //回傳 account

            $tel = json_encode(array(
                'account' => $account,
            ));
            echo $tel;

        } else {
            //回傳 errorMsg json 資料
            echo json_encode(array(
                'errorMsg' => '資料未輸入完全！'
            ));
        }
    } else {
        //回傳 errorMsg json 資料
        echo json_encode(array(
            'errorMsg' => '請求無效，只允許 POST 方式訪問！'
        ));
    }
?>