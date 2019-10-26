<?php 
    // Cross-Origin Resource Sharing Header
    header('Access-Control-Allow-Origin: http://localhost:8080');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
    header('Access-Control-Allow-Credentials: true');

    session_start(); 
    $getPostData = $_POST['data'];

    $_SESSION['memberRegistrartionStep1'] = $getPostData;

    print_r($_SESSION);

?>
<?php

    

?>
