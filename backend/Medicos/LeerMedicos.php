<?php
include '../conexion.php';

$sql = "SELECT M.id AS id_medico, M.nombre AS nombre_medico, M.apellido AS apellido_medico, E.nombre AS especialidad FROM medicos AS M INNER JOIN especialidades AS E ON M.especialidad_id = E.id;";

$result = $con->query($sql);

$medicos = [];

while ($fila = $result->fetch_assoc()) {
    $medicos[] = $fila;
}

echo json_encode($medicos);
