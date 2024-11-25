import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Escaner', url: '/escaneo', icon: 'scan-circle' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Acerca de', url: '/acerca', icon: 'people' },
    { title: 'Manual de Usuario', url: '/manual', icon: 'book' },
    { title: 'Ayuda', url: '/ayuda', icon: 'help' },
    { title: 'Cerrar Sesión', icon: 'log-out' },
  ];

  adminPage = { title: 'Administración', url: '/gestion-usuario', icon: 'construct' };
  qrPage = { title: 'QR Asistencia', url: '/generar-qr', icon: 'qr-code' };

  public username: string = '';
  userEmail: string | null = null;
  isAdmin: boolean = false;
  isProfessor: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController,
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.getUserEmail();
  }

  getUserEmail() {
    this.authService.getUser().subscribe(user => {
      if (user && user.email) {
        this.userEmail = user.email;
        this.username = user.email.split('@')[0].toUpperCase();

        // Limpiar las opciones del menú para evitar duplicaciones
        this.appPages = [
          { title: 'Inicio', url: '/home', icon: 'home' },
          { title: 'Escaner', url: '/escaneo', icon: 'scan-circle' },
          { title: 'Perfil', url: '/perfil', icon: 'person' },
          { title: 'Acerca de', url: '/acerca', icon: 'people' },
          { title: 'Manual de Usuario', url: '/manual', icon: 'book' },
          { title: 'Ayuda', url: '/ayuda', icon: 'help' },
          { title: 'Cerrar Sesión', icon: 'log-out' },
        ];

        // Verificar tipo de usuario y agregar opciones correspondientes
        this.isAdmin = user.email.includes('@duocucadmin');
        this.isProfessor = user.email.includes('@profesor');

        if (this.isAdmin) {
          this.appPages.splice(this.appPages.length - 1, 0, this.adminPage);
        }

        if (this.isProfessor) {
          this.appPages.splice(this.appPages.length - 1, 0, this.qrPage);
        }
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      sessionStorage.removeItem('loggedInUser');
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

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url == '/reset-password';
  }

  checkMenuVisibility(url: string) {
    if (url === '/login' || url === '/reset-password' || url === '/casobien' || url === '/casomal') {
      this.menuController.enable(false);
    } else {
      this.menuController.enable(true);
    }
  }
}
