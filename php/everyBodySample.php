<?php
// Cross-Origin Resource Sharing Header
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');

$returnData = array('is_error' => 0, 'msg' => '');

$mobile = $_GET['account'];
$clientName = $_GET['name'];

if (preg_match('/^\d+$/i', $mobile)){
	if (strlen($mobile) == 10){
		
		$code = rand(111111, 999999);

        $url = "http://api.every8d.com/API21/HTTP/sendSMS.ashx";
        
        $postUrl = $url . '?UID=' . "0975810910";
        $postUrl .= '&PWD=' . "0975810910";
        $postUrl .= '&SB=' . "手機驗證碼";
        $postUrl .= '&MSG=' . $clientName . "歡迎你！你的驗證碼是：" . $code ;
        $postUrl .= '&DEST=' . $mobile ;


		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $postUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Length: 0'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        if(curl_errno($ch)){
            echo 'Curl error: ' . curl_error($ch);
        }
        //print_r(curl_getinfo($ch));
		$output = curl_exec($ch); 
        //echo "output" . curl_exec($ch);
        curl_close($ch);

		$returnData = json_encode(array('is_error' => 0, 'msg' => '驗證碼發送成功, 您已成功註冊, 請留意手機簡訊','verificationCode' => $code),JSON_UNESCAPED_UNICODE);

	}else{
		$returnData = json_encode(array('is_error' => 1, 'msg' => '手機號碼必須為10個數字'),JSON_UNESCAPED_UNICODE);
	}
}else{
	$returnData = json_encode(array('is_error' => 0, 'msg' => '請確認手機號碼無誤'),JSON_UNESCAPED_UNICODE);
}

echo $returnData;

?>