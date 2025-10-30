import { crearReserva } from "../almacenamiento";

const especialidades = ['Cardiología', 'Dermatología', 'Pediatría'];
const disponibilidad = [
  { dia: '2025-10-12', horarios: ['09:00', '10:30', '14:00'] },
  { dia: '2025-10-13', horarios: ['08:00', '11:00', '15:30'] },
  { dia: '2025-10-14', horarios: ['10:00', '13:00', '16:00'] }
];

function appReservas() {
  return `
    <section class="especialidad-section">
      <h1>Reservas</h1>
      <form id="reservaForm">
        <div class="especialidad-section">
          <label for="especialidad">Especialidad:</label>
          <select id="especialidad" name="especialidad" required class="horario-select">
            <option value="" disabled selected>Seleccione una especialidad</option>
            ${especialidades.map(esp => `<option value="${esp}">${esp}</option>`).join('')}
          </select>
        </div>

        <div class="dia-section">
          <h4>Fecha</h4>
          <select id="fecha" name="fecha" required class="horario-select">
            <option value="" disabled selected>Seleccione una fecha</option>
            ${disponibilidad.map(d => `<option value="${d.dia}">${d.dia}</option>`).join('')}
          </select>
        </div>

        <div class="dia-section">
          <h4>Hora</h4>
          <select id="hora" name="hora" required class="horario-select">
            <option value="" disabled selected>Seleccione una hora</option>
          </select>
        </div>

        <button type="submit">Confirmar reserva</button>
      </form>
    </section>
  `;
}


function initReservas(app) {
    app.innerHTML = appReservas();
  const user = sessionStorage.getItem('userEmail');
  const reservaForm = document.getElementById('reservaForm');
  const fechaSelect = document.getElementById('fecha');
  const horaSelect = document.getElementById('hora');

  // Actualiza horarios según la fecha seleccionada
  fechaSelect.addEventListener('change', () => {
    const fechaSeleccionada = fechaSelect.value;
    const horarios = disponibilidad.find(d => d.dia === fechaSeleccionada)?.horarios || [];

    horaSelect.innerHTML = '<option value="" disabled selected>Seleccione una hora</option>';
    horarios.forEach(hora => {
      horaSelect.innerHTML += `<option value="${hora}">${hora}</option>`;
    });
  });

  reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = new FormData(reservaForm);
    const especialidad = datos.get('especialidad');
    const fecha = datos.get('fecha');
    const hora = datos.get('hora');
    crearReserva(user, especialidad, fecha, hora);
    alert('Reserva creada con éxito');
    reservaForm.reset();
    horaSelect.innerHTML = '<option value="" disabled selected>Seleccione una hora</option>';
  });
}


export { initReservas };