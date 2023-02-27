<?php
require 'api-pass.php';

if ($_GET['password'] != READ_PASS) {
    die('incorrect password');
}

function milliseconds() {
    $mt = explode(' ', microtime());
    return ((int)$mt[1]) * 1000 + ((int)round($mt[0] * 1000));
}

$name = $_GET['name'];
//$time = $_GET['time'];
$time = milliseconds() / 1000;

class Press {
    public $name;
    public $time;

    public function __construct ($name, $time) {
        $this->name = $name;
        $this->time = $time;
    }
}

// load
$jsonString = file_get_contents('data.json');
$data = json_decode($jsonString, true);


if (count(array_filter($data['button-press-q'], function ($var) use ($name) {
    return $var['name'] == $name;
})) == 0) {
    // edit
    $data['button-press-q'][] = new Press($name, $time);

    // save
    $newJsonString = json_encode($data);
    file_put_contents('data.json', $newJsonString);
}
