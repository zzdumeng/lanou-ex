<?php

	$body = file_get_contents('php://input');

	$req = json_decode($body);

	$json = [ 'mesage' => "hello, {$req->name}" ]

	echo json_encode($json);
		// echo $req->name;
// echo $body;
