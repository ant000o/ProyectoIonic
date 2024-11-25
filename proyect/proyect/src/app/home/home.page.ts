import { Component } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  // username!: string; 
  // mail!: string;  
  userEmail: string | null = null;
  

  private animation!: Animation;
  constructor(private aCtrl: AnimationController, private authService: AuthService) { }
  
  ngOnInit() {
    this.getUserEmail();
  }

  getUserEmail() {
    this.authService.getUser().subscribe(user => {
      if (user && user.email) {
        this.userEmail = user.email.split('@')[0].toUpperCase();
      }
    });
  }

  
  
  ngAfterViewInit() {
    // Configura la animación
    this.animation = this.aCtrl.create()
      .addElement(document.querySelector('.scanner-icon') as HTMLElement)
      .iterations(1)  // Solo se ejecutará una vez cada vez que se invoque
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'rotate(0)' },
        { offset: 0.4, transform: 'rotate(10deg)' },
        { offset: 0.8, transform: 'rotate(-10deg)' },
        { offset: 1, transform: 'rotate(0)' },
      ]);

    // Reproduce la animación automáticamente al cargar la vista
    this.animation.play();

    // Configura que la animación se repita cada 5 segundos (5000 ms)
    setInterval(() => {
      this.animation.play();
    }, 2500); // Cambia el tiempo según la frecuencia deseada
  }
  
  

}
