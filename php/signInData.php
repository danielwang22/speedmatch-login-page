<?php

    // Cross-Origin Resource Sharing Header
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');

    $myFile = "http://shun.inspire-dt.com/signIn.json";

    if($_POST['signInData']){
        //password
        $signInData = $_POST['signInData'];
        
        //get local json
        $EXSITJSONFILE = file_get_contents($myFile);
        $array = json_decode($EXSITJSONFILE,true);
        print_r($array);
        
        //push local json file
        array_push($array,$signInData);
        
        //convert
        $json = json_encode($array,JSON_UNESCAPED_UNICODE);
        
        //write json data into signIn.json file
        if(file_put_contents($myFile,array('data'=>$json))) {
                echo 'Data successfully saved';
            }
        else {
                echo "error";
        }
    }

?>
