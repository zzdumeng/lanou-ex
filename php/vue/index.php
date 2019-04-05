<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json');

    $name = $_POST['name'];

    $res = ['message' => "$name, you make a successful post requst"];
    // echo json_encode($res);
    echo json_encode($res);