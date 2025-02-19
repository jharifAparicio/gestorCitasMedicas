<?php
session_start();
include "conect.php";

if (!isset($_SESSION['rol'])) {
    header("Location: login.php"); 
    exit;
}

if($_SESSION['rol']=="admin"){
    echo "Eres admin :)";
}else if($_SESSION['rol']=="paciente"){
    echo "Eres paciente :)";
}else if($_SESSION['rol']=="medico"){
    echo "Eres medico :)";
}
?>