<?php
require 'api-pass.php';

echo $_GET['password'] == READ_PASS ? '1' : '0';
