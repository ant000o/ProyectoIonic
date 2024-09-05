import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasomalPageRoutingModule } from './casomal-routing.module';

import { CasomalPage } from './casomal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasomalPageRoutingModule
  ],
  declarations: [CasomalPage]
})
export class CasomalPageModule {}
