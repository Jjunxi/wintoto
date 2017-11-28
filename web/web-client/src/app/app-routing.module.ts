import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotosComponent } from './components/totos/totos.component';
import { HistoryDistributionComponent } from './components/history-distribution/history-distribution.component';

const routes: Routes = [
  { path: '', redirectTo: '/history', pathMatch: 'full' },
  { path: 'history', component: HistoryDistributionComponent},
  { path: 'totos', component: TotosComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
