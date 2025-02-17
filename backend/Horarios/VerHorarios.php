<?php
include '../conexion.php';

$id = $_GET['id_medico'];

$sql = "SELECT M.id AS id, M.nombre AS nombre_Medico, M.apellido AS apellido_medico, H.hora_inicio AS inicio, H.hora_fin AS fin, H.dia_semana AS dias, C.fecha_cita AS fecha_cita, C.hora_cita AS hora_cita FROM horarios AS H INNER JOIN medicos AS M ON M.id = H.medico_id INNER JOIN citas AS C ON M.id = C.medico_id WHERE C.estado = 'Programada' AND C.medico_id = $id;";

$result = $con->query($sql);

$medicos = [];

while ($fila = $result->fetch_assoc()) {
    $medicos[] = $fila;
}

echo json_encode($medicos);
