import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-casobien',
  templateUrl: './casobien.page.html',
  styleUrls: ['./casobien.page.scss'],
})

export class CasobienPage implements OnInit {

  fechaHoraIngreso: string = '';
  ubicacionTexto: string = 'Obteniendo ubicación...';

  constructor() {}

  async ngOnInit() {
    this.fechaHoraIngreso = new Date().toLocaleString();

    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.ubicacionTexto = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
      this.ubicacionTexto = 'No se pudo obtener la ubicación';
    }
  }
}
