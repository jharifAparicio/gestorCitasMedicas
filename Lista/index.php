<?php
// Incluir la conexión a la base de datos
require 'conexion.php';

// Obtener el ID del médico (puede ser desde un formulario o sesión)
$medico_id = $_GET['medico_id'] ?? null;

// Consulta para obtener las citas del médico
$citas = [];
if ($medico_id) {
    $query = "SELECT c.id, c.fecha_cita, c.hora_cita, 
                     p.nombre AS paciente_nombre, p.apellido AS paciente_apellido,
                     m.nombre AS medico_nombre, m.apellido AS medico_apellido
              FROM citas c
              JOIN pacientes p ON c.paciente_id = p.id
              JOIN medicos m ON c.medico_id = m.id
              WHERE c.medico_id = :medico_id AND c.estado = 'Programada'
              ORDER BY c.fecha_cita, c.hora_cita";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':medico_id', $medico_id, PDO::PARAM_INT);
    $stmt->execute();
    $citas = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Citas Programadas</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Mis Citas Programadas</h1>

    <!-- Formulario para ingresar el ID del médico -->
    <form method="GET" action="">
        <label for="medico_id">ID del Médico:</label>
        <input type="number" id="medico_id" name="medico_id" required>
        <button type="submit">Buscar Citas</button>
    </form>

    <!-- Mostrar las citas -->
    <?php if ($medico_id && !empty($citas)) : ?>
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Paciente</th>
                    <th>Médico</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($citas as $cita) : ?>
                    <tr>
                        <td><?php echo htmlspecialchars($cita['fecha_cita']); ?></td>
                        <td><?php echo htmlspecialchars($cita['hora_cita']); ?></td>
                        <td><?php echo htmlspecialchars($cita['paciente_nombre'] . ' ' . $cita['paciente_apellido']); ?></td>
                        <td><?php echo htmlspecialchars($cita['medico_nombre'] . ' ' . $cita['medico_apellido']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php elseif ($medico_id) : ?>
        <p>No existe el médico.</p>
    <?php endif; ?>
</body>
</html>