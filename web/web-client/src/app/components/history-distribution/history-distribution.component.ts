import { Component, OnInit, Inject, Input } from '@angular/core';
import { Toto } from "app/models/toto.model";
import { Subscription } from 'rxjs/Subscription';
import $ from 'jquery';
import Chart from 'chart.js';

const X = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49'];
var Y_overalall = [];
var Y_additional = []; 
var Y_six = []; 

var statistic_overall = [];
var statistic_additional = [];

for(var i = 0; i < 50; i++)
{
  Y_overalall[i] = 0 ; 
  Y_additional[i] = 0; 
  Y_six[i] = 0; 
}


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
  totos: Toto[] = [];
  subscriptionTotos: Subscription;
  constructor( @Inject('TotoService') private TotoService) { }

  ngOnInit() {
    console.log("test");
    this.getTotos();
  }

  //getTotos(): void {
    //  this.subscriptionTotos = this.TotoService.getTotos()
    //    .subscribe(totos => 
    //    {
    //       this.totos = totos;
    //       //console.log(this.totos);
    //       console.log(this.totos.length);
    //       this.totos.forEach( function (arrayItem)
    //       {
    //           //console.log(arrayItem);
    //           var additional = arrayItem.additional; 
    //           Y_overalall[additional - 1] ++;
    //           statistic_additional[additional - 1] ++; 
    //           var major = arrayItem.lucks; 
    //           major.forEach( function (luck)
    //           {
    //             Y_overalall[luck - 1] ++;

    //           }); 
    //       }); 
    //       this.drawBarChart();   
    //       //this.drawBarChartAdditional();
    //       //this.drawBarChartSixNumber();
    //    }
    //   );
  //}

  getTotos(): void {
    this.TotoService.getTotos()
      .then(totos => {
        this.totos = this.totos.concat(totos);
        console.log(this.totos);
         this.totos.forEach( function (arrayItem)
         {
             //console.log(arrayItem);
             var additional = arrayItem.additional; 
             Y_overalall[additional - 1] ++;
             Y_additional[additional - 1] ++; 
             var major = arrayItem.lucks; 
             major.forEach( function (luck)
             {
               Y_overalall[luck - 1] ++;
               Y_six[luck - 1] ++;
             }); 
         }); 
        this.drawBarChart($('#myChart'), Y_overalall);   
        this.drawBarChart($('#myChartAdditional'), Y_additional);   
        this.drawBarChart($('#myChartSixNumber'), Y_six);   
      })
      .catch(err => console.log(err));
  }

  drawBarChart(ctx, datalist): void {
    var color = Chart.helpers.color;
    console.log(ctx);
    var frequency = [];

    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: X,
        label: 'Number Count',
        datasets: [{
          data: datalist,
          backgroundColor: color(COLORS.red).alpha(0.5).rgbString(),
        }],
      },
      
      options: {}
    });
  }
}
