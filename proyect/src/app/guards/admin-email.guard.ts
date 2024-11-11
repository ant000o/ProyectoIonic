import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Servicio de autenticación para obtener el usuario actual
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminEmailGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(
      map(user => {
        // Verifica si user existe y contiene un correo válido
        return user && user.email ? user.email.includes('@duocucadmin') : false;
      }),
      tap(isAdminEmail => {
        if (!isAdminEmail) {
          this.router.navigate(['/home']); // Redirige si el correo no tiene el dominio permitido
        }
      })
    );
  }
}
