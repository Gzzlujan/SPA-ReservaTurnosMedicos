function appHistorial() {
    return `
        <h2>Historial de Reservas</h2>
            <div class="card-reservas">
            </div>
        `
}

function initHistorial(app) {
    app.innerHTML = appHistorial();
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
        document.getElementById('app').innerHTML = '<h2>Por favor, inicie sesión para ver su historial de reservas.</h2>';
        return;
    }
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    if (reservas.length === 0 ) {
        document.getElementById('app').innerHTML = '<h2>No hay reservas registradas.</h2>';
        return;
    }
    const userReservas = reservas.filter(reserva => reserva.usuarioEmail === userEmail);
    if (userReservas.length === 0) {
        document.getElementById('app').innerHTML = '<h2>No hay reservas registradas.</h2>';
        return;
    }
    userReservas.forEach(reserva => {
        const reservaDiv = document.createElement('div');
        reservaDiv.classList.add('reserva-item');
        reservaDiv.innerHTML = `
            <p><strong>Especialidad:</strong> ${reserva.especialidad}</p>
            <p><strong>Fecha:</strong> ${reserva.fecha}</p>
            <p><strong>Hora:</strong> ${reserva.hora}</p>
            <hr>
        `;
        document.querySelector('.card-reservas').appendChild(reservaDiv);
    });
}

export { initHistorial };