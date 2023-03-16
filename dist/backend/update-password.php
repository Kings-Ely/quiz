<?php
require 'api-pass.php';

if ($_GET['master'] != API_PASS) {
    die('1');
}

file_put_contents("./password.txt", $_GET['password']);
die('0');
