import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictComponent } from './district/district.component';
import { HistoryComponent } from './history/history.component';
import { InfoComponent } from './info/info.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StateComponent } from './state/state.component';
import { ZonesComponent } from './zones/zones.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'states', component: StateComponent},
  {path: 'districts', component: DistrictComponent},
  {path: 'zones', component: ZonesComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'info', component: InfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
