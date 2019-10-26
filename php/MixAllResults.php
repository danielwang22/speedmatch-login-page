<?php 
    // Cross-Origin Resource Sharing Header
    header('Access-Control-Allow-Origin: http://localhost:8080');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
    header('Access-Control-Allow-Credentials: true');
    
    session_start(); 
    $getPostData = $_POST['data'];

    $_SESSION['memberRegistrartionStep3'] = array('password'=>$getPostData);

    $mixData = array_merge($_SESSION['memberRegistrartionStep3'],$_SESSION['memberRegistrartionStep2'],$_SESSION['memberRegistrartionStep1']);

    $_SESSION['memberRegistrartionStepFinal'] = $mixData;
    //print_r($_SESSION['memberRegistrartionStepFinal']);

    $myFile = '../json/signIn.json';
    $formatData = json_encode($_SESSION['memberRegistrartionStepFinal']);

    $EXSITJSONFILE = file_get_contents($myFile);
    $array = json_decode($EXSITJSONFILE,true);
    print_r($array);
    
    //push local json file
    array_push($array,$formatData);
    
    //convert
    $json = json_encode($array,JSON_UNESCAPED_UNICODE);
    
    //write json data into signIn.json file
    if(file_put_contents($myFile,array('data'=>$json))) {
            echo 'Data successfully saved';
        }
    else {
            echo "error";
    }
 ?>