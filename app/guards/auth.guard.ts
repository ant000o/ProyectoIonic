import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';  // Importamos el servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return new Promise(resolve => {
      this.authService.getUser().subscribe(user => {
        if (user) {
          resolve(true); // Usuario autenticado, permite el acceso
        } else {
          this.router.navigate(['/login']); // Redirige a la página de login
          resolve(false); // No permitir el acceso
        }
      });
    });
  }
}
