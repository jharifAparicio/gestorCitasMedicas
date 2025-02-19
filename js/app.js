const body = document.querySelector('body');

function cargarlayout() {
    fetch('/Citas_medicas/views/usuario.html')
        .then(response => response.text())
        .then(data => {
            body.innerHTML = data;
        });
}
cargarlayout();

function cargarMedicos() {
    var app = document.getElementById('app');
    let html = '';
    fetch('/Citas_medicas/backend/Medicos/LeerMedicos.php')
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
                                        <button onclick="cargarHorario(${data[i].id_medico})">Ver disponibilidad</button>
                                    </td>
                                </tr>
                            `;
            }
            html += "</table>";
            app.innerHTML = html;
        })
}

async function traerhorario(id_medico) {
    var dia, inicio, final, medico;
    let response = await fetch(`/Citas_medicas/backend/Horarios/VerHorarios.php?id_medico=${id_medico}`)
    let data = await response.json()
    dia = data[0].dias
    inicio = data[0].inicio
    final = data[0].fin
    medico = data[0].nombre + " " + data[0].apellido
    return { dia, inicio, final, medico }
}

async function traerCitas(id_medico) {
    var citas = [];
    let response = await fetch(`/Citas_medicas/backend/Citas/LeerCitas.php?id_medico=${id_medico}`)
    let data = await response.json()
    citas = data
    return citas
}
async function cargarHorario(id_medico) {
    var app = document.getElementById('app');
    var horario = await traerhorario(id_medico);
    var citas = await traerCitas(id_medico);
    fetch("views/horario.html")
        .then(response => response.text())
        .then(data => {
            app.innerHTML = data;
            var medico = document.getElementById('medico');
            var fecha = document.getElementById('fecha');
            var tabla = document.getElementById('horario');

            medico.innerHTML = "Medico: " + horario.medico

            fecha.innerHTML = obtenerProximoDia(horario.dia)
            document.getElementById('dia').innerHTML = horario.dia;

            let html = `
                <table>
                    <tr>
                        <th>Hora</th>
                        <th>Estado</th>
                    </tr>
                `;

            var intervalos = generarIntervalos(horario.inicio, horario.final);

            const horas = [];

            for (let i = 0; i < intervalos; i++) {
                let hora = String(horaInicio).padStart(2, "0");
                let minutos = String(minutosInicio).padStart(2, "0");
                horas.push(`${hora}:${minutos}`);

                minutosInicio = (minutosInicio + 30) % 60;
                if (minutosInicio === 0) horaInicio++;
            }
            horas.forEach(hora => {
                let estado = "Libre"; // Inicialmente asumimos que está libre

                // Verificar si esa hora está ocupada
                ocupados.forEach(cita => {
                    let horaInicio = cita.hora;

                    // Comprobar si la hora está dentro del rango de hora_inicio y hora_fin
                    if (hora >= horaInicio && hora < horaFin) {
                        estado = "Ocupado"; // Si está ocupada, cambiamos el estado
                    }
                });

                // Agregar la fila a la tabla
                html += `<tr><td>${hora}</td><td>${estado}</td></tr>`;
            });

            // Cerrar la tabla
            html += "</table>";

            console.log(html);

            tabla.innerHTML = html;
        })
}

function programarCita() {

}

function generarIntervalos(horaInicio, horaFin) {
    // Convertir las horas en minutos
    const [horaInicioH, minutoInicioM] = horaInicio.split(":").map(Number);
    const [horaFinH, minutoFinM] = horaFin.split(":").map(Number);

    // Calcular los minutos desde la medianoche para la hora de inicio y fin
    const inicioEnMinutos = horaInicioH * 60 + minutoInicioM;
    const finEnMinutos = horaFinH * 60 + minutoFinM;

    // Arreglo para almacenar los intervalos
    const intervalos = [];

    // Generar los intervalos de 30 minutos
    for (let i = inicioEnMinutos; i < finEnMinutos; i += 30) {
        // Convertir los minutos a formato HH:MM
        const horas = String(Math.floor(i / 60)).padStart(2, '0');
        const minutos = String(i % 60).padStart(2, '0');

        // Agregar el intervalo al arreglo
        intervalos.push(`${horas}:${minutos}`);
    }

    return intervalos;
}
// funcion que traiga la fecha del dia mas proximo a futuro que se recibe como parametro

function obtenerProximoDia(diaBuscado) {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let hoy = new Date();
    let diaActual = hoy.getDay();
    let indiceBuscado = diasSemana.indexOf(diaBuscado);

    if (indiceBuscado === -1) {
        throw new Error("Día inválido. Usa nombres de días en español como 'Lunes', 'Martes', etc.");
    }

    // Calcular los días que faltan para el próximo día buscado
    let diasFaltantes = (indiceBuscado - diaActual + 7) % 7;
    diasFaltantes = diasFaltantes === 0 ? 7 : diasFaltantes;

    // Calcular la fecha futura
    let proximaFecha = new Date();
    proximaFecha.setDate(hoy.getDate() + diasFaltantes);

    // Formatear la fecha en AAAA-MM-DD
    let anio = proximaFecha.getFullYear();
    let mes = String(proximaFecha.getMonth() + 1).padStart(2, "0"); // +1 porque los meses van de 0 a 11
    let dia = String(proximaFecha.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
}