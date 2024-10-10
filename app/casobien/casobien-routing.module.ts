import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasobienPage } from './casobien.page';

const routes: Routes = [
  {
    path: '',
    component: CasobienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasobienPageRoutingModule {}
