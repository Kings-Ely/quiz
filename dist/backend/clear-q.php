<?php

// load
$jsonString = file_get_contents('data.json');
$data = json_decode($jsonString, true);

// edit
$data['button-press-q'] = [];

// save
$newJsonString = json_encode($data);
file_put_contents('data.json', $newJsonString);
