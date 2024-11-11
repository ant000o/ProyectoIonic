import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import QRCode from 'qrcode';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage {
  qrCodeUrl: string = '';
  qrData: string = '';
  qrDataVisible: boolean = false;
  isLoading: boolean = false;

  constructor(private firestore: AngularFirestore) {}

  async generateQRCode() {
    this.isLoading = true;  // Mostrar spinner de carga
    const uniqueCode = this.generateUniqueCode();
    this.qrData = uniqueCode;

    try {
      this.qrCodeUrl = await QRCode.toDataURL(uniqueCode);
      await this.firestore.collection('codigo-qr').doc('codigo-activo').set({
        id: uniqueCode,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error generando el código QR:', error);
    } finally {
      this.isLoading = false;  // Ocultar spinner
    }
  }

  generateUniqueCode(): string {
    return 'QR-' + Math.random().toString(36).substr(2, 9);
  }

  toggleQrDataVisibility() {
    this.qrDataVisible = !this.qrDataVisible;
  }

  async deleteQRCode() {
    await this.firestore.collection('codigo-qr').doc('codigo-activo').delete();
    this.qrCodeUrl = '';
    this.qrData = '';
  }
}
