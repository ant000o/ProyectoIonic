import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Diccionario de usuarios
  private users = [ 
    { email: 'test@example.com', password: '123456' },
    { email: 'alo.cruz@duocuc.cl', password: '123456' },
    { email: 'an.camposa@duocuc.cl', password: '123456' },
    { email: 'penca', password: '123456' }
  ];

  private loggedInUser: { email: string, password: string } | null = null;

  constructor() {}

  // Obtener username del usuario logueado
  getLoggedInUsername() {
    return this.loggedInUser ? this.loggedInUser.email.split('@')[0] : '';
  }

  // Inicio de sesión
  login(email: string, password: string) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.loggedInUser = user; 
      sessionStorage.setItem('loggedInUser', email); // Guardar el email en sessionStorage
      return Promise.resolve({ email });
    } else {
      return Promise.reject('Credenciales inválidas');
    }
  }


  // Restablecer contraseña (simulación)
  resetPassword(email: string) {
    const user = this.users.find(u => u.email === email);
    if (user) {
      return Promise.resolve('Se ha enviado un correo electrónico de restablecimiento.');
    } else {
      return Promise.reject('El correo electrónico no está registrado.');
    }
  }

  // Cerrar sesión (simulación)
  logout() {
    this.loggedInUser = null; 
    return Promise.resolve('Sesión cerrada');
  }
}
