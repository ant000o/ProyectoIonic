import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importamos AlertController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit, AfterViewInit {
  email: string = ''; 
  password: string = ''; 
  showPassword = false;

  constructor(private authService: AuthService, private router: Router, 
              private animationCtrl: AnimationController, private alertController: AlertController) {}
  ngOnInit() {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  

  async login() {
    try {
      this.email = this.email.toLowerCase(); // Convertir el email a minúsculas
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error) {
      this.showAlert('Ingreso fallido', 'Por favor, comprueba tus credenciales.');
    }
  }

  
    async register() {
      try {
        await this.authService.register(this.email, this.password);
        this.showAlert('¡Registrado exitosamente!','');
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





  ngAfterViewInit() {
    const logo = document.querySelector('.logoduoc') as HTMLElement;

    
    const animation = this.animationCtrl.create()
      .addElement(logo)
      .duration(3000) 
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateY(0)', opacity: '1' },
        { offset: 0.5, transform: 'translateY(10px)', opacity: '0.5' },
        { offset: 1, transform: 'translateY(0)', opacity: '1' }
      ]);

    
    animation.play();
  }


}