<?php
session_start();
include 'conect.php';
$e = $_POST['email'];
$c=$_POST['contraseña'];
$sql= "select * from usuarios where usuario = '$e' and clave = '$c'";
$r=$con->query($sql);
if($r->num_rows>0){
    $user = $r->fetch_assoc();
    $_SESSION['rol']=$user['rol'];
    
    header("location: pagina.php");
    exit;
}
?>
