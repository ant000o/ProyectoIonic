import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfesorEmailGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(
      map(user => {
        // Verifica si el correo contiene '@profesor'
        return user && user.email ? user.email.includes('@profesor') : false;
      }),
      tap(isProfessorEmail => {
        if (!isProfessorEmail) {
          // Redirige si el correo no contiene '@profesor'
          this.router.navigate(['/home']);
        }
      })
    );
  }
}
