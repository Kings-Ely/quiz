<?php
require 'api-pass.php';

echo $_GET['password'] == file_get_contents('./password.txt') ? '1' : '0';
