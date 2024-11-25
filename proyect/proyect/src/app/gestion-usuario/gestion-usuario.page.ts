import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.page.html',
  styleUrls: ['./gestion-usuario.page.scss'],
})
export class GestionUsuarioPage implements OnInit {

  // Variables para manejo de usuarios
  name: string = '';
  lastname: string = '';
  age: number | null = null;
  rol: string = '';
  email: string = ''; 
  password: string = ''; 
  showPassword = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private animationCtrl: AnimationController, 
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.showAlert('¡Registrado exitosamente!', '');

      // Limpiar los campos después del registro
      this.email = '';
      this.password = '';
      this.name = '';
      this.lastname = '';
      this.age = null;
      this.rol = '';
      
    } catch (error) {
      this.showAlert('Error', 'Verifique el correo y contraseña.');
    }
  }

  // Método para mostrar la alerta con ion-alert
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
