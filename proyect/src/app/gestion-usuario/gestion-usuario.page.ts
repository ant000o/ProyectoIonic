import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Importamos el servicio de usuarios
import { Observable } from 'rxjs'; // Para el manejo de observables de Firebase

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.page.html',
  styleUrls: ['./gestion-usuario.page.scss'],
})
export class GestionUsuarioPage implements OnInit {

  // Variables para manejo de usuarios
  name: string = '';
  age: number | null = null;
  rol: string = '';
  users$: Observable<any[]>;  // Observable para los usuarios desde Firebase

  constructor( 
    private userService: UserService         
  ) { 
    this.users$ = this.userService.getUsers(); 
  }

  ngOnInit() {
  }

  
  isFormValid(): boolean {
    return this.name.trim() !== '' && this.age !== null && this.rol.trim() !== '';
  }

  
  addUser() {
    // Verificamos que el nombre solo contenga letras
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;  // Permite letras con acentos y espacios
  
    if (!nameRegex.test(this.name.trim())) {
      alert('El nombre solo debe contener letras.');
      return;
    }
  
    // Verificamos nuevamente si el formulario es válido
    if (this.isFormValid()) {
      this.userService.addUser(this.name, this.age!, this.rol).then(() => {
        alert('Usuario agregado exitosamente!');
        this.name = ''; // Limpiamos el input de nombre
        this.age = null; // Limpiamos el input de edad
        this.rol = ''; // Limpiamos el input de rol
      });
    } 
  }

  

}
