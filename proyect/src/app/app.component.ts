import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router'; // Importamos NavigationEnd
import { MenuController } from '@ionic/angular';  // Importamos MenuController

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Escaner', url: '/escaneo', icon: 'qr-code' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Acerca de', url: '/acerca', icon: 'people' },
    { title: 'Manual de Usuario', url: '/manual', icon: 'book' },
    { title: 'Ayuda', url: '/ayuda', icon: 'help' },
    { title: 'Administración', url: '/gestion-usuario', icon: 'construct' },
    { title: 'Cerrar Sesión', icon: 'log-out' },
  ];

  public username: string = '';
  


  constructor(
    private authService: AuthService, 
    private router: Router, 
    private menuController: MenuController,  // Inyectamos MenuController
  ) {
    this.initializeApp();  // Llamamos a la función para inicializar la app
  }

  ngOnInit() {
    this.loadUsername();
  }

  loadUsername() {
    const email = sessionStorage.getItem('loggedInUser'); // Obtener el email del sessionStorage
    if (email) {
      this.username = email.split('@')[0].toUpperCase(); // Extraer la parte antes del @
    }
  }

  logout() {
    this.authService.logout().then(() => {
      sessionStorage.removeItem('loggedInUser'); // Limpiar el sessionStorage al cerrar sesión
      this.router.navigate(['/login']);
    });
  }

  initializeApp() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkMenuVisibility(event.url);
      }
    });
  }

  checkMenuVisibility(url: string) {
    // Oculta el menú en las rutas
    if (url === '/login' || url === '/reset-password' || url === '/casobien' || url === '/casomal') {
      this.menuController.enable(false);
    } else {
      this.menuController.enable(true);
    }
  }
}