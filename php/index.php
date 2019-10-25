<html>
<head>
	<title>EVERY8D SMS API2.1 PHP Sample (HTTP)</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>

<body>
<?php
	// Cross-Origin Resource Sharing Header
	header('Access-Control-Allow-Origin: http://localhost:8080');
	
	require('./SMSHttp.php');
	$sms = new SMSHttp();
	echo $sms;
	$userID="0975810910";	//發送帳號
	$password="0975810910";	//發送密碼
	$subject = "php test";	//簡訊主旨，主旨不會隨著簡訊內容發送出去。用以註記本次發送之用途。可傳入空字串。
	$content = "hello php sms";	//簡訊內容

	$mobile = $_POST['account']; //接收前端的客戶電話號碼	
	//接收人之手機號碼。格式為: +886912345678或09123456789。多筆接收人時，請以半形逗點隔開( , )，如0912345678,0922333444。
	$sendTime= "";		//簡訊預定發送時間。-立即發送：請傳入空字串。-預約發送：請傳入預計發送時間，若傳送時間小於系統接單時間，將不予傳送。格式為YYYYMMDDhhmnss；例如:預約2009/01/31 15:30:00發送，則傳入20090131153000。若傳遞時間已逾現在之時間，將立即發送。
	// 取餘額
	if($sms->getCredit($userID,$password)){
		echo "取得餘額成功，餘額為：" . $sms->credit . "<br />";
	} else {
		echo "取得餘額失敗，" . $sms->processMsg . "<br />";
	}
	
	//傳送簡訊
	if($sms->sendSMS($userID,$password,$subject,$content,$mobile,$sendTime)){
		echo "傳送簡訊成功，餘額為：" . $sms->credit . "，此次簡訊批號為：" . $sms->batchID . "<br />";
	} else {
		echo "傳送簡訊失敗，" . $sms->processMsg . "<br />";
	}
?>
</body>

</html>