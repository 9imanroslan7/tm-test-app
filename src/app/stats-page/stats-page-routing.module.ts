import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsPagePage } from './stats-page.page';

const routes: Routes = [
  {
    path: '',
    component: StatsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsPagePageRoutingModule {}
