import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-casobien',
  templateUrl: './casobien.page.html',
  styleUrls: ['./casobien.page.scss'],
})

export class CasobienPage implements OnInit {

  fechaHoraIngreso: string = '';
  ubicacionTexto: string = 'Obteniendo ubicación...';

  constructor(private firestore: AngularFirestore) {}

  async ngOnInit() {
    this.fechaHoraIngreso = new Date().toLocaleString();
  
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.ubicacionTexto = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
  
      // Obtener todos los registros actuales en Firestore para calcular el número de registro
      const registrosSnapshot = await this.firestore.collection('asistencia-bdd').get().toPromise();
      const numeroRegistro = (registrosSnapshot?.size || 0) + 1; // Incrementar basado en la cantidad actual de documentos
  
      // Guardar la asistencia con el número de registro
      const dataAsistencia = {
        fechaHora: this.fechaHoraIngreso,
        ubicacion: this.ubicacionTexto,
        linkUbicacion: `https://www.google.com/maps?q=${this.ubicacionTexto}`,
        registro: `Registro #${numeroRegistro}`
      };
  
      await this.firestore.collection('asistencia-bdd').add(dataAsistencia);
      console.log('Asistencia guardada correctamente con Registro #', numeroRegistro);
  
    } catch (error) {
      console.error('Error al obtener la ubicación o guardar la asistencia', error);
      this.ubicacionTexto = 'No se pudo obtener la ubicación';
    }
  }
      
}
