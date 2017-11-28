import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { TotoService } from "app/services/toto.service";


//import { RoutesModule } from "app/app.routes";

import { HttpModule } from '@angular/http';
import { TotosComponent } from './components/totos/totos.component';
import { HistoryDistributionComponent } from './components/history-distribution/history-distribution.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TotosComponent,
    HistoryDistributionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //RoutesModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: 'TotoService',
      useClass: TotoService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
