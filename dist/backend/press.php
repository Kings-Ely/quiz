<?php

$name = $_GET['name'];

// load
$jsonString = file_get_contents('data.json');
$data = json_decode($jsonString, true);

if (!in_array($name, $data['button-press-q'])) {
    // edit
    $data['button-press-q'][] = $name;

    // save
    $newJsonString = json_encode($data);
    file_put_contents('data.json', $newJsonString);
}
