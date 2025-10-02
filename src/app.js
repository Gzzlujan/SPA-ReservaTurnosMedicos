import { initRegister } from './views/register.js';

class App {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '#/login': './views/login.html',
            '#/register': './views/register.html'
        }
        this.appDiv = document.getElementById('app');
        this.loggedOptionsDiv = document.getElementById('loggedOptions');
    }

    async loadView(route) {
        const viewPath = this.routes[route]|| this.routes['/'];
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

    initLogin() {
        import ('./views/login.js').then(module => {
            module.initLogin();
        }).catch(err => {
            console.error('Error loading login module:', err);
        });
    }

    start() {
        const render = () => {
            const hash = window.location.hash;
            if (this.routes[hash]) {
                this.loggedOptionsDiv.classList.add('display-none');
                this.loadView(hash);
            } else {
                this.appDiv.innerHTML = '';
                this.loggedOptionsDiv.classList.remove('display-none');
            }
        }
        window.addEventListener('hashchange', render);
        window.addEventListener('DOMContentLoaded', render);
    }
}

export const app = new App();