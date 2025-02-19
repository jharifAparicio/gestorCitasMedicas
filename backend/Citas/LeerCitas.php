<?php
include '../database/Database.php';
$con = (new Database())->getConnection();

$id = $_GET['id_medico'];

$sql = "SELECT fecha_cita AS fecha, hora_cita AS hora FROM citas WHERE medico_id = $id;";

$result = $con->query($sql);

$citas = [];

while ($fila = $result->fetch_assoc()) {
    $citas[] = $fila;
}

echo json_encode($citas);
