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
    this.fechaHoraIngreso = new Date().toLocaleString();
  
    // Obtener el nombre de usuario logueado
    this.username = await this.authService.getUsername();
  
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.ubicacionTexto = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
  
      const registrosSnapshot = await this.firestore.collection('asistencia-bdd').get().toPromise();
      const numeroRegistro = (registrosSnapshot?.size || 0) + 1;
  
      const dataAsistencia = {
        fechaHora: this.fechaHoraIngreso,
        ubicacion: this.ubicacionTexto,
        linkUbicacion: `https://www.google.com/maps?q=${this.ubicacionTexto}`,
        registro: `Registro #${numeroRegistro}`,
        usuario: this.username 
      };
  
      await this.firestore.collection('asistencia-bdd').add(dataAsistencia);
      console.log('Asistencia guardada correctamente con Registro #', numeroRegistro);
  
    } catch (error) {
      console.error('Error al obtener la ubicación o guardar la asistencia', error);
      this.ubicacionTexto = 'No se pudo obtener la ubicación';
    }
  }
}
