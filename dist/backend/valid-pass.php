<?php
require 'api-pass.php';

echo $_GET['password'] == API_PASS ? '1' : '0';
