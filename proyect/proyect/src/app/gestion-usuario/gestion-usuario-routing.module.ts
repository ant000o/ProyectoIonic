import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionUsuarioPage } from './gestion-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: GestionUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionUsuarioPageRoutingModule {}
