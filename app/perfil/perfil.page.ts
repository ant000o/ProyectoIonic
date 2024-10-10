import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userEmail: string | null = null;
  mail!: string;

  constructor(private authService: AuthService) {}

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

  loadEmail(){
    const email = sessionStorage.getItem('loggedInUser'); // Obtener el email del sessionStorage
    if (email) {
      this.mail = email
    }
  }
}
