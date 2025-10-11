import { initRegister } from './views/register.js';
import { initReservas } from './views/reservas.js';

class App {
    constructor() {
        this.routes = {
            '': '/',  // ruta base
            '#/': '/',
            '#/login': '/views/login.html',
            '#/register': '/views/register.html',
            '#/reservas': '/',
            '#/historial': '/',
        }
        this.appDiv = document.getElementById('app');
        this.loggedOptionsDiv = document.getElementById('loggedOptions');
        this.navOption = document.getElementById('navOption');
    }

    async loadView(route) {
        try {
            if (route === '' || route === '#/') {
                this.appDiv.innerHTML = '';
                return;
            }

            const viewPath = this.routes[route];
            if (!viewPath) {
                throw new Error(`Ruta no encontrada: ${route}`);
            }

            const res = await fetch(viewPath);
            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
            const html = await res.text();
            this.appDiv.innerHTML = html;

            switch (route) {
                case '#/login':
                    this.loggedOptionsDiv.classList.add('display-none');
                    const { initLogin } = await import('./views/login.js');
                    await initLogin();
                    break;
                case '#/register':
                    this.loggedOptionsDiv.classList.add('display-none');
                    await initRegister();
                    break;
                case '#/reservas':
                    await initReservas(this.appDiv);
                    break;
            }
        } catch (error) {
            console.error('Error al cargar la vista:', error);
            this.appDiv.innerHTML = '<h1>Error al cargar la vista</h1><p>' + error.message + '</p>';
        }
    }

    render(hash) {
        const userName = sessionStorage.getItem('userName');
        const userEmail = sessionStorage.getItem('userEmail');
        const isLoggedIn = !!userEmail;

        // Ocultar/mostrar opciones basadas en el estado de sesión
        if (isLoggedIn) {
            this.loggedOptionsDiv.classList.add('display-none');
            this.navOption.classList.remove('display-none');
            document.getElementById('user').textContent = userName;
        } else {
            // Usuario no logueado
            this.loggedOptionsDiv.classList.remove('display-none');
            this.navOption.classList.add('display-none');
            document.getElementById('user').textContent = '';
        }

        // Manejar la navegación
        const normalizedHash = hash || '#/';
        
        // Verificar acceso a rutas protegidas
        if (!isLoggedIn && (normalizedHash === '#/reservas' || normalizedHash === '#/historial')) {
            window.location.hash = '#/login';
            return;
        }

        // Cargar la vista correspondiente
        if (this.routes[normalizedHash]) {
            this.loadView(normalizedHash);
        } else {
            this.appDiv.innerHTML = '<h1>Página no encontrada</h1>';
        }
    }

    start() {
        // Inicializar los event listeners del router
        window.addEventListener('hashchange', () => this.render(window.location.hash));
        window.addEventListener('DOMContentLoaded', () => this.render(window.location.hash));
        window.addEventListener('popstate', () => this.render(window.location.hash));

        // Configurar event listeners para los botones de navegación
        const setupNavButtons = () => {
            const btnReserva = document.getElementById('btnRerserva');
            const btnCerrarSesion = document.getElementById('logOutBtn');
            const btnHistorial = document.getElementById('btnHistorial');

            if (btnReserva) {
                btnReserva.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.hash = '#/reservas';
                });
            }

            if (btnCerrarSesion) {
                btnCerrarSesion.addEventListener('click', (e) => {
                    e.preventDefault();
                    sessionStorage.removeItem('userEmail');
                    document.getElementById('user').textContent = '';
                    this.loggedOptionsDiv.classList.remove('display-none');
                    this.navOption.classList.add('display-none');
                    window.location.hash = '#/login';
                });
            }

            if (btnHistorial) {
                btnHistorial.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.hash = '#/historial';
                });
            }
        };

        // Configurar los botones inicialmente
        setupNavButtons();

        // Renderizar la vista inicial
        this.render(window.location.hash || '#/');
    }
    }

export const app = new App();