import { registrarUsuario, validarUsuario } from "../almacenamiento";

function initRegister() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) {
        console.warn('No se encontró el formulario de registro');
        return;
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const datos = new FormData(registerForm);

        const nombre = datos.get('nombre');
        const email = datos.get('email');
        const telefono = datos.get('telefono');
        const password = datos.get('password');

        if (validarUsuario(email)) {
            alert('El usuario ya está registrado. Por favor, inicie sesión.');
            window.location.hash = '#/login';
            return;
        }
        registrarUsuario(nombre, email, telefono, password);
        alert('Registro exitoso. Ahora puede iniciar sesión.');
        window.location.hash = '#/login';
    });
}

export { initRegister };