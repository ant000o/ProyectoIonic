import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

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
    { title: 'Ayuda', url: '/ayuda', icon: 'help' },
    { title: 'Manual de Usuario', url: '/folder/trash', icon: 'book' },
    { title: 'Cerrar Sesión', url: '/folder/spam', icon: 'log-out' },
  ];

  public username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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
}
