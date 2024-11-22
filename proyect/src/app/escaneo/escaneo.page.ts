import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Definir la interfaz para los datos del documento
interface CodigoQR {
  id: string;
}

@Component({
  selector: 'app-escaneo',
  templateUrl: './escaneo.page.html',
  styleUrls: ['./escaneo.page.scss'],
})
export class EscaneoPage {
  isScanning: boolean = false;
  scanResult: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  async activateCamera() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (!status.granted) {
      const alert = await this.alertController.create({
        header: 'Permiso de cámara',
        message: 'Se requiere permiso de la cámara para escanear el código QR.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
  
    try {
      this.isScanning = true;
      BarcodeScanner.hideBackground(); // Esconde la interfaz de la app
  
      // Inicia el escaneo con la cámara en pantalla completa
      const result = await BarcodeScanner.startScan();
  
      // Procesa el resultado del escaneo
      if (result.hasContent) {
        console.log('Contenido del QR:', result.content);
        this.isScanning = false;
  
        // Detiene el escaneo y muestra la interfaz de la app nuevamente
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
  
        // Redirigir a otra vista tras escanear
        this.router.navigate(['/casobien']);
      } else {
        await this.showAlert('No se encontró contenido en el código QR.');
      }
    } catch (err) {
      console.error('Error al escanear:', err);
      this.stopScan();
    }
  }
  

  stopScan() {
    this.isScanning = false;
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Resultado del escaneo',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
