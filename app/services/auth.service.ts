import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private users = [
    { email: 'test@example.com', password: '123456' },
    { email: 'alo.cruz@duocuc.cl', password: '123456' },
    { email: 'an.camposa@duocuc.cl', password: '123456' },
    { email: 'penca', password: '123456' }]
    
  // private loggedInUser: { email: string, password: string } | null = null;
  
  constructor(private afAuth: AngularFireAuth) {}


  async login(email: string, password: string) {
    // sessionStorage.setItem('loggedInUser', email); // Guardar el email en sessionStorage
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.afAuth.signOut();
  }

  getUser() {
    return this.afAuth.user;
  }


  // getLoggedInUsername() {
  //   return this.loggedInUser ? this.loggedInUser.email.split('@')[0] : '';
  // }


  
  // Restablecer contraseña (simulación)
  resetPassword(email: string) {
    const user = this.users.find(u => u.email === email);
    if (user) {
      return Promise.resolve('Se ha enviado un correo electrónico de restablecimiento.');
    } else {
      return Promise.reject('El correo electrónico no está registrado.');
    }
  }
}


  



  
