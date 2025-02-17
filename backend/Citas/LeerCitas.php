<?php
include '../database/Database.php';
$con = (new Database())->getConnection();

$id = $_GET['id_medico'];
