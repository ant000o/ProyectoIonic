import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username!: string; 
  mail!: string;  

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUsername();
    this.loadEmail();
  }

  loadUsername() {
    const email = sessionStorage.getItem('loggedInUser'); // Obtener el email del sessionStorage
    if (email) {
      this.username = email.split('@')[0].toUpperCase(); // Extraer la parte antes del @
    }
  }

  loadEmail(){
    const email = sessionStorage.getItem('loggedInUser'); // Obtener el email del sessionStorage
    if (email) {
      this.mail = email
    }
  }
}
