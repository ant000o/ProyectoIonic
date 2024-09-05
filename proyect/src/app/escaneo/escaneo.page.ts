import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escaneo',
  templateUrl: './escaneo.page.html',
  styleUrls: ['./escaneo.page.scss'],
})

export class EscaneoPage implements OnInit{

  constructor(private alertController: AlertController, private router: Router) {}

  async activateCamera() {
    const alert = await this.alertController.create({
      header: 'La camara esta activa!',
      message: 'Escanea el QR',
      buttons: [
        {
          text: 'Correcto',
          handler: () => {
            this.router.navigate(['/casobien']);
          }
        },
        {
          text: 'Incorrecto',
          handler: () => {
            this.router.navigate(['/casomal']);
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
