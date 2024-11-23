import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-escaneo',
  templateUrl: './escaneo.page.html',
  styleUrls: ['./escaneo.page.scss'],
})
export class EscaneoPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firestore: AngularFirestore,
    private platform: Platform
  ) {}

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then((result) => {
        this.isSupported = result.supported;
      });
    } else {
      this.isSupported = false;
    }
  }

  async scan(): Promise<void> {
    if (!this.platform.is('capacitor')) {
      this.showAlert('El escaneo solo está disponible en dispositivos móviles.');
      return;
    }

    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    try {
      const { barcodes } = await BarcodeScanner.scan();
      if (barcodes.length > 0) {
        this.barcodes = barcodes;
        const scannedID = barcodes[0].rawValue?.trim() || ''; // Asegura que sea string
        console.log('Código QR escaneado:', scannedID); // Log de depuración
        this.validateQR(scannedID);
      } else {
        this.showAlert('No se escaneó ningún código QR válido.');
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      this.showAlert('Error al escanear el código QR.');
    }
  }

  async validateQR(scannedID: string) {
    try {
      const docRef = this.firestore.collection('codigo-qr').doc('codigo-activo');
      const docSnapshot = await docRef.get().toPromise();

      if (docSnapshot?.exists) {
        const data = docSnapshot.data() as { id: string };
        const expectedID = data?.id?.trim() || ''; // Asegura que sea string y sin espacios
        console.log('ID esperado:', expectedID); // Log de depuración

        if (expectedID === scannedID) {
          console.log('Códigos coinciden. Escaneado:', scannedID);
          this.router.navigate(['/casobien']);
        } else {
          console.error('Códigos no coinciden:', { esperado: expectedID, escaneado: scannedID });
          this.showAlert(`Código QR incorrecto. Escaneado: ${scannedID}, Esperado: ${expectedID}`);
        }
      } else {
        this.showAlert('No se encontró el código activo en la base de datos.');
      }
    } catch (error) {
      console.error('Error al validar QR:', error);
      this.showAlert('Error al validar el código QR.');
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Por favor, concede permiso para usar la cámara.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Resultado del escaneo',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
