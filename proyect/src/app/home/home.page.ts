import { Component } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  private animation!: Animation;
  constructor(private aCtrl: AnimationController) { }

  isRotating: boolean[] = [false, false, false];

  toggleRotation(index: number) {
    this.isRotating[index] = !this.isRotating[index];
  }

  ngAfterViewInit() {
    // Configura la animación
    this.animation = this.aCtrl.create()
      .addElement(document.querySelector('.scanner-icon') as HTMLElement)
      .iterations(1)  // Solo se ejecutará una vez cada vez que se invoque
      .duration(2000)
      .fromTo('transform', 'translateX(0px) scale(1)', 'translateX(100px) scale(0.8)')
      .fromTo('background', 'red', 'blue')
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.4, transform: 'scale(1.5) rotate(180deg)' },
        { offset: 0.8, transform: 'scale(0.5) rotate(360deg)' },
        { offset: 1, transform: 'scale(1) rotate(0)' },
      ]);

    // Reproduce la animación automáticamente al cargar la vista
    this.animation.play();

    // Configura que la animación se repita cada 5 segundos (5000 ms)
    setInterval(() => {
      this.animation.play();
    }, 5000); // Cambia el tiempo según la frecuencia deseada
  }

  ejecutar() {
    // Permite reproducir la animación manualmente si se invoca
    this.animation.play();
  }

}
