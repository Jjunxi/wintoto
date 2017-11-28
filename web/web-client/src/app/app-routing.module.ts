import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotosComponent } from './components/totos/totos.component';
import { AboutComponent } from './components/about/about.component';
import { HistoryDistributionComponent } from './components/history-distribution/history-distribution.component';

const routes: Routes = [
  { path: '', redirectTo: '/history', pathMatch: 'full' },
  { path: 'history', component: HistoryDistributionComponent},
  { path: 'totos', component: TotosComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
