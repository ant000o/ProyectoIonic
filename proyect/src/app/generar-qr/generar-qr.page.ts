import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Para interactuar con Firestore
import QRCode from 'qrcode';  // Librería para generar QR

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage {
  qrCodeUrl: string = ''; // Para almacenar la URL del código QR generado
  qrData: string = ''; // Para almacenar el dato contenido en el QR
  qrDataVisible: boolean = false; // Controla la visibilidad del ID

  constructor(private firestore: AngularFirestore) {}

  async generateQRCode() {
    // Generar un código QR único
    const uniqueCode = this.generateUniqueCode();
    this.qrData = uniqueCode; // Guardamos el dato que va en el QR

    try {
      this.qrCodeUrl = await QRCode.toDataURL(uniqueCode); // Generar la URL del QR
      // Guardar el código QR en Firestore bajo 'codigo-qr'
      await this.firestore.collection('codigo-qr').doc('codigo-activo').set({
        id: uniqueCode,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error generando el código QR: ', error);
    }
  }

  // Método para generar un código único (puedes personalizarlo)
  generateUniqueCode(): string {
    return 'QR-' + Math.random().toString(36).substr(2, 9);
  }

  // Alterna la visibilidad del ID
  toggleQrDataVisibility() {
    this.qrDataVisible = !this.qrDataVisible;
  }

  async deleteQRCode() {
    // Eliminar el código QR actual de Firestore
    await this.firestore.collection('codigo-qr').doc('codigo-activo').delete();
    this.qrCodeUrl = '';  // Limpiar la URL del QR generado
    this.qrData = '';     // Limpiar el dato del QR
  }
}
