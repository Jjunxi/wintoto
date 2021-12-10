import { Component, OnInit } from '@angular/core';
import {Toto} from '../api/models/toto';
import {TotoControllerService} from '../api/services/toto-controller.service';

@Component({
  selector: 'app-test-service',
  templateUrl: './test-service.component.html',
  styleUrls: ['./test-service.component.css']
})
export class TestServiceComponent implements OnInit {
  totos: Toto[];
  constructor(private totoService: TotoControllerService) { }

  ngOnInit(): void {
    this.getTodos();
    console.log(this.totos)
  }

  getTodos(): void {
    this.totoService.find().subscribe(totos => (this.totos = totos));

  }

}
