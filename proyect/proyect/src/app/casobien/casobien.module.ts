import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasobienPageRoutingModule } from './casobien-routing.module';

import { CasobienPage } from './casobien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasobienPageRoutingModule
  ],
  declarations: [CasobienPage]
})
export class CasobienPageModule {}
