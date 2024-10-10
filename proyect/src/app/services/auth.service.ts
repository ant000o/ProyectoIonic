import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // Usuarios simulados para el modo de simulación 
  // Verificar con version modo simulacion
  /*
  private users = [
    { email: 'test@example.com', password: '123456' },
    { email: 'alo.cruz@duocuc.cl', password: '123456' },
    { email: 'an.camposa@duocuc.cl', password: '123456' },
    { email: 'penca', password: '123456' }
  ];
  */
  constructor(private afAuth: AngularFireAuth) {}

  async login(email: string, password: string) {
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

  // Validar el formato del correo electrónico
  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Restablecer contraseña usando Firebase Authentication (version: Firebase)
  
  async resetPassword(email: string) {
    // Validar el formato del correo antes de
    if (!this.validateEmail(email)) {
      return Promise.reject('Por favor, introduce una dirección de correo válida.');
    }

    try {
      // Intentar enviar el correo de restablecimiento de contraseña
      await this.afAuth.sendPasswordResetEmail(email);
      return 'Si el correo está registrado, se ha enviado un correo de restablecimiento.';
      
    } catch (error: unknown) {
      // Verificación de error como FirebaseError
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === 'auth/invalid-email') {
        return Promise.reject('Por favor, comprueba tu dirección de correo electrónico.');
      } else {
        return Promise.reject('Ocurrió un error al intentar restablecer la contraseña.');
      }
    }
  }

  // Restablecer contraseña (version: simulación)
  // Descomentar para usar esta versión (Comentar version anterior)
  /*
  resetPassword(email: string) {
    // Validar el formato del correo antes de
    if (!this.validateEmail(email)) {
      return Promise.reject('Por favor, introduce una dirección de correo válida.');
    }

    const user = this.users.find(u => u.email === email);
    if (user) {
      return Promise.resolve('Se ha enviado un correo electrónico de restablecimiento (simulación).');
    } else {
      return Promise.reject('El correo electrónico no está registrado.');
    }
  }
  */
}


