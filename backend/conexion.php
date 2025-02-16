<?php
$con = new mysqli("localhost", "root", "", "Citas_medicas");
if ($con->connect_error) {
    die("Error: " . $con->connect_error);
}
