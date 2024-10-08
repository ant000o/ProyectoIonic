import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importamos AlertController

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
  // users$: Observable<any[]>;  



  email: string = ''; 
  password: string = ''; 
  showPassword = false;

  constructor(private authService: AuthService, private router: Router, 
    private animationCtrl: AnimationController, private alertController: AlertController) {}
  ngOnInit() {
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
  

}
