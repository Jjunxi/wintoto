import { Component, OnInit, Inject, Input } from '@angular/core';
import { Toto } from "app/models/toto.model";
import { Subscription } from 'rxjs/Subscription';
import $ from 'jquery';
import Chart from 'chart.js';

const X = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49'];
const Y = [59, 40, 48, 46, 43, 57, 34, 49, 39, 38, 54, 38, 39, 37, 33, 53, 50, 40, 49, 49, 30, 47, 52, 48, 40, 36, 52, 59, 36, 36, 58, 45, 56, 58, 37, 45, 60, 39, 58, 51, 50, 40, 45, 53, 50, 48, 46, 39, 31];
const COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

@Component({
  selector: 'app-history-distribution',
  templateUrl: './history-distribution.component.html',
  styleUrls: ['./history-distribution.component.css']
})

export class HistoryDistributionComponent implements OnInit {
  totos: Toto[];

  constructor( @Inject('TotoService') private TotoService) { }

  ngOnInit() {
    // this.getTotos();
    this.drawBarChart();
  }

  // getTotos(): void {
  //   // this.totos = this.TotoService.getTotos();
  //   this.subscriptionTotos = this.TotoService.getTotos()
  //     .subscribe(totos => this.totos = totos);
  // }

  drawBarChart(): void {
    var color = Chart.helpers.color;
    // console.log(color(COLORS.red).alpha(0.5).rgbString())
    var ctx = $('#myChart');
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: X,
        datasets: [{
          data: Y,
          backgroundColor: color(COLORS.red).alpha(0.5).rgbString(),
        }],
      },
      
      options: {}
    });
  }

}
