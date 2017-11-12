import { Component, OnInit, Inject } from '@angular/core';
import { Toto } from "app/models/toto.model";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-totos',
  templateUrl: './totos.component.html',
  styleUrls: ['./totos.component.css']
})
export class TotosComponent implements OnInit {
  totos: Toto[];
  subscriptionTotos: Subscription;

  constructor( @Inject('TotoService') private TotoService) { }

  ngOnInit() {
    this.getTotos();
  }

  getTotos(): void {
    // this.totos = this.TotoService.getTotos();
    this.subscriptionTotos = this.TotoService.getTotos()
      .subscribe(totos => this.totos = totos);
  }

  
}
