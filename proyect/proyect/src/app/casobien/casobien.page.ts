import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-casobien',
  templateUrl: './casobien.page.html',
  styleUrls: ['./casobien.page.scss'],
})
export class CasobienPage implements OnInit {
  fechaHoraIngreso: string = '';
  ubicacionTexto: string = 'Obteniendo ubicación...';
  username: string = '';

  constructor(private firestore: AngularFirestore, private authService: AuthService) {}

  async ngOnInit() {
    try {
      console.log('Iniciando la vista de Casobien...');
      this.fechaHoraIngreso = new Date().toLocaleString();

      // Obtener el nombre del usuario logueado
      this.username = await this.authService.getUsername();
      console.log('Usuario logueado:', this.username);

      // Obtener la ubicación actual
      const coordinates = await Geolocation.getCurrentPosition();
      this.ubicacionTexto = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
      console.log('Ubicación obtenida:', this.ubicacionTexto);

      // Preparar datos para guardar en Firestore
      const dataAsistencia = {
        fechaHora: this.fechaHoraIngreso,
        ubicacion: this.ubicacionTexto,
        linkUbicacion: `https://www.google.com/maps?q=${this.ubicacionTexto}`,
        usuario: this.username,
      };

      // Agregar un nuevo documento a la colección
      await this.firestore.collection('asistencia-bdd').add(dataAsistencia);
      console.log('Asistencia guardada correctamente:', dataAsistencia);

    } catch (error) {
      console.error('Error al obtener la ubicación o guardar la asistencia:', error);
      this.ubicacionTexto = 'No se pudo obtener la ubicación';
    }
  }
}
