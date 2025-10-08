import { initRegister } from './views/register.js';
import { initReservas } from './views/reservas.js';

class App {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '#/login': 'views/login.html',
            '#/register': 'views/register.html',
            '#/reservas': 'views/reservas.hbs',
            '#/historial': 'views/historial.hbs',
        }
        this.appDiv = document.getElementById('app');
        this.loggedOptionsDiv = document.getElementById('loggedOptions');
        this.navOption = document.getElementById('navOption');
    }

    async loadView(route) {
        const viewPath = this.routes[route] || this.routes['/'];
        try {
            const res = await fetch(viewPath);
            if (!res.ok) throw new Error(`Error ${res.status} : ${res.statusText}`);
            const html = await res.text();
            this.appDiv.innerHTML = html;

            if (route === '#/login') {
                const { initLogin } = await import('./views/login.js');
                initLogin();
            }
            if (route === '#/register') {
                initRegister();
            }

        } catch (error) {
            console.error('Error al cargar la vista:', error);
            this.appDiv.innerHTML = '<h1>Error al cargar la vista</h1>';
        }
    }

    render(hash) {
        const userEmail = sessionStorage.getItem('userEmail');
        const isLoggedIn = !!userEmail;

        // Ocultar/mostrar opciones basadas en el estado de sesión
        if(isLoggedIn){
            this.loggedOptionsDiv.classList.add('display-none');
            this.navOption.classList.remove('display-none');
        }
        if (hash === '') {
            this.loggedOptionsDiv.classList.remove('display-none');
            this.navOption.classList.add('display-none');
        } else if (hash !== '') {
            this.loggedOptionsDiv.classList.add('display-none');
            this.navOption.classList.add('display-none');
        }

        if (this.routes[hash]) {
 if (!isLoggedIn && (hash === '#/reservas' || hash === '#/historial')) {
                window.location.hash = '#/login';
                return;
            }
            this.loadView(hash);
        } else if (hash === '') {
            this.appDiv.innerHTML = '';
        }
    }

    start() {
        const hash = window.location.hash;
        const btnReserva = document.getElementById('btnRerserva');
        const btnCerrarSesion = document.getElementById('logOutBtn');
        const btnHistorial = document.getElementById('btnHistorial');

        if (btnCerrarSesion && btnReserva && btnHistorial && sessionStorage.getItem('userEmail')) {
            btnReserva.addEventListener('click', async () => {
                window.location.hash = '#/reservas';
                await initReservas();
            });

            btnCerrarSesion.addEventListener('click', () => {
                sessionStorage.removeItem('userEmail');
                document.getElementById('user').textContent = '';
                this.loggedOptionsDiv.classList.add('display-none');
                window.location.hash = '#/login';
            });

            // Evento para historial
            btnHistorial.addEventListener('click', async () => {
                this.appDiv.innerHTML = '<h2>Historial de turnos</h2>';
                // Aquí puedes agregar la lógica para cargar y mostrar el historial de turnos
            });
        }

        window.addEventListener('hashchange', () => this.render(window.location.hash));
        window.addEventListener('DOMContentLoaded', () => this.render(window.location.hash));
        window.addEventListener('popstate', () => this.render(window.location.hash));
    }
}
export const app = new App();