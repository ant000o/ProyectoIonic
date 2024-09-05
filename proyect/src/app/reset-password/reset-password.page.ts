import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit{
  email: string = ''; 

  constructor(private authService: AuthService) {}

  async resetPassword() {
    try {
      const message = await this.authService.resetPassword(this.email);
      alert(message);
    } catch (error) {
      console.error('Error con restablecer contraseña', error);
      alert('Correo Invalido. Por favor comprueba tu direccion');
    }
  }

  ngOnInit() {
  }
}
