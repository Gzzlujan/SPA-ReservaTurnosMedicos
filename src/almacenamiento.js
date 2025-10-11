function obtenerUsuario() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

function registrarUsuario(nombre, email, telefono, password) {
    const usuarios = obtenerUsuario();
    const nuevoUsuario = { nombre, email, telefono, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function validarUsuario(email) {
    const usuarios = obtenerUsuario();
    return usuarios.find(usuario => usuario.email === email) !== undefined;
}

function usuarioRegistrado(email) {
    const usuarios = obtenerUsuario();
    return usuarios.some(usuario => usuario.email === email);
}

function crearReserva(usuarioEmail, especialidad, fecha, hora) {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const nuevaReserva = { usuarioEmail, fecha, hora, especialidad };
    reservas.push(nuevaReserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

function sesionIniciada(userEmail, usuarioNombre) {
    sessionStorage.setItem('userEmail', userEmail);
    sessionStorage.setItem('userName', usuarioNombre);
}

function cerrarSesion() {
    sessionStorage.clear();
}


export { registrarUsuario, validarUsuario, usuarioRegistrado, obtenerUsuario, crearReserva, sesionIniciada };