import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsPagePageRoutingModule } from './stats-page-routing.module';

import { StatsPagePage } from './stats-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPagePageRoutingModule
  ],
  declarations: [StatsPagePage]
})
export class StatsPagePageModule {}
