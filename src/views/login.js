import { obtenerUsuario, usuarioRegistrado, sesionIniciada } from "../almacenamiento";

function initLogin() {
    const user = document.getElementById('user');
    const loginForm = document.getElementById('loginForm');
    const navDisplay = document.getElementById('navOption');
    
    if (!loginForm) {
        console.warn('No se encontró el formulario de login');
        return;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const datos = new FormData(loginForm);

        const email = datos.get('email');
        const password = datos.get('password');
        if (!usuarioRegistrado(email)) {
            console.log(usuarios);
            alert('Usuario no registrado. Por favor, regístrese primero.');
            window.location.hash = '#/register';
            return;
        }
        const usuarios = obtenerUsuario();
        const usuario = usuarios.find(u => u.email === email && u.password === password);
        if (usuario) {
            user.textContent = usuario.nombre;
            navDisplay.classList.remove('display-none');
            document.getElementById('app').innerHTML = '';
            sesionIniciada(email, usuario.nombre);
        }

    });
}

export { initLogin };