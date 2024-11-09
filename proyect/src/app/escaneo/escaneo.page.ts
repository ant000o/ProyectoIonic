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
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.isScanning = true;
    BarcodeScanner.hideBackground();

    try {
      const result = await BarcodeScanner.startScan();
      this.scanResult = result;
      if (result.hasContent) {
        this.isScanning = false;
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();

        // Obtener el documento de Firestore
        const docRef = await this.firestore.collection('codigo-qr').doc('codigo-activo').get().toPromise();

        // Verificación de existencia de docRef y sus datos
        const docData = docRef?.data() as CodigoQR; // Usar el operador de encadenamiento opcional

        if (docData?.id && result.content === docData.id) {
          // Redirigir si el código es válido
          this.router.navigate(['/casobien']);
        } else {
          await this.showAlert('Código incorrecto. Inténtalo nuevamente.');
        }
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
