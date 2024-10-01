import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) 
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'casobien',
    loadChildren: () => import('./casobien/casobien.module').then( m => m.CasobienPageModule)
  },
  {
    path: 'casomal',
    loadChildren: () => import('./casomal/casomal.module').then( m => m.CasomalPageModule)
  },
  {
    path: 'escaneo',
    loadChildren: () => import('./escaneo/escaneo.module').then( m => m.EscaneoPageModule)
  },
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) 
  },
  { 
    path: 'reset-password', 
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) 
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'manual',
    loadChildren: () => import('./manual/manual.module').then( m => m.ManualPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },  {
    path: 'acerca',
    loadChildren: () => import('./acerca/acerca.module').then( m => m.AcercaPageModule)
  },
  {
    path: 'gestion-usuario',
    loadChildren: () => import('./gestion-usuario/gestion-usuario.module').then( m => m.GestionUsuarioPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
