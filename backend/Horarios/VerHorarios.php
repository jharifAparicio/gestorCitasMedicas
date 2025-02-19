<?php
include '../database/Database.php';
$con = (new Database())->getConnection();

$id = $_GET['id_medico'];

$sql = "SELECT M.nombre AS nombre, M.apellido AS apellido ,dia_semana AS dias, hora_inicio AS inicio, hora_fin AS fin FROM horarios INNER JOIN medicos AS M ON M.id = medico_id WHERE medico_id = $id";

$result = $con->query($sql);

$medicos = [];

while ($fila = $result->fetch_assoc()) {
    $medicos[] = $fila;
}

echo json_encode($medicos);
