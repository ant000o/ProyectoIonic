import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular'; // Importa el AlertController

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: string = '';

  constructor(private authService: AuthService, private alertController: AlertController) {} // Inyecta el AlertController

  async resetPassword() {
    try {
      const message = await this.authService.resetPassword(this.email);
      this.showAlert('Éxito', message); // Muestra el mensaje de éxito
    } catch (error) {
      console.error('Error al restablecer la contraseña', error);
      this.showAlert('Error', 'Correo inválido. Por favor, comprueba tu dirección'); // Muestra el mensaje de error
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {}
}
