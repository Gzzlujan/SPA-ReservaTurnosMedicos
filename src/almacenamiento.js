function obtenerUsuario() {
    return JSON.parse(localStorage.getItem('usuario')) || [];
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

export { registrarUsuario, validarUsuario, usuarioRegistrado };