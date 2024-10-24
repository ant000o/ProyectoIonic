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
  
      // Obtener el contador actual desde Firestore
      const contadorDoc = await this.firestore.collection('utilidades').doc('contador-asistencias').get().toPromise();
      
      let numeroRegistro = 0;
      
      // Verificar si el documento existe
      if (contadorDoc && contadorDoc.exists) {
        const data = contadorDoc.data() as { contador: number }; // Especificar el tipo de datos esperado
        numeroRegistro = data.contador || 0; // Usar el contador del documento o 0 si no existe
      }
  
      // Incrementar el contador
      numeroRegistro++;
  
      // Guardar la asistencia con el número de registro
      const dataAsistencia = {
        fechaHora: this.fechaHoraIngreso,
        ubicacion: this.ubicacionTexto,
        linkUbicacion: `https://www.google.com/maps?q=${this.ubicacionTexto}`,
        registro: `Registro #${numeroRegistro}`
      };
  
      await this.firestore.collection('asistencia-bdd').add(dataAsistencia);
      console.log('Asistencia guardada correctamente');
  
      // Actualizar el contador en Firestore
      await this.firestore.collection('utilidades').doc('contador-asistencias').set({ contador: numeroRegistro });
  
    } catch (error) {
      console.error('Error al obtener la ubicación o guardar la asistencia', error);
      this.ubicacionTexto = 'No se pudo obtener la ubicación';
    }
  }    
}
