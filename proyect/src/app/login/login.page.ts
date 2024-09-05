import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  email: string = ''; 
  password: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    try {
      this.email = this.email.toLowerCase(); // Convertir el email a minúsculas
      await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('/home'); 
    } catch (error) {
      console.error('Error de ingreso', error);
      alert('Ingreso fallido. Por favor, comprueba tus credenciales.');
    }
  }

  ngOnInit() {
  }
}
