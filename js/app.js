const app = document.getElementById('app');

function cargarMedicos() {
    let html = '';
    return fetch('/Citas_medicas/backend/Medicos/LeerMedicos.php')
        .then(response => response.json())
        .then(data => {
            html += `
                <table>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Acciones</th>
                        </tr>`;
            for (let i = 0; i < data.length; i++) {
                html += `
                                <tr>
                                    <td>${data[i].id_medico}</td>
                                    <td>${data[i].nombre_medico}</td>
                                    <td>${data[i].apellido_medico}</td>
                                    <td>${data[i].especialidad}</td>
                                    <td>
                                        <button onclick="MostrarHorario(${data[i].id_medico})">Ver disponibilidad</button>
                                    </td>
                                </tr>
                            `;
            }
            html += "</table>";
            return html;
        })
}

function CargarCalendario() {

}


function mostrarMedicos() {
    cargarMedicos()
        .then(html => {
            app.innerHTML = html;
        });
}

mostrarMedicos();

function MostrarHorario(id_medico) {
    fetch(`/Citas_medicas/backend/Horarios/VerHorarios.php?id_medico=${id_medico}&fecha=${document.getElementById('fecha').value}`)
        .then(response => response.json())
        .then(data => {
            const hora_inicio = data[0].hora_inicio;
            var html = '';
            html += `
                <table>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Acciones</th>
                        </tr>`;
            for (let i = 0; i < data.length; i++) {
                html += `
                                <tr>
                                    <td>${data[i].id}</td>
                                    <td>${data[i].fecha_cita}</td>
                                    <td>${data[i].hora_cita}</td>
                                    <td>
                                        <button onclick="AgendarCita(${data[i].id_horario})">Agendar Cita</button>
                                    </td>
                                </tr>
                            `;
            }
            html += "</table>";
            app.innerHTML = html;
        })
}