<?php
require __DIR__.'/BeCal_SQL.php';

$name = $_POST['name'];
$pw = $_POST['pw'];

//echo "> $name : $pw";

BeSQL::createRootUser($name, $pw);
