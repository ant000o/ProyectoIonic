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
    this.mail = sessionStorage.getItem('loggedInUser') || '';
    this.username = sessionStorage.getItem('username') || '';
  }
}
