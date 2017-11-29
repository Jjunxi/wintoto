import { Component, OnInit, Inject, Input } from '@angular/core';
import { Toto } from "app/models/toto.model";
import { Subscription } from 'rxjs/Subscription';
import $ from 'jquery';
import Chart from 'chart.js';

const X = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49'];


function create_dict(X, value)
{
  var dict = new Array();
  for(var i = 0; i < 49; i++)
  {
    dict[X[i]] = value[i]; 
  }
  //console.log(dict);
  var items = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
      return second[1] - first[1];
  });
  console.log(items);
  return dict; 
}





var dict_seven;
var dict_additional; 
var dict_six; 

var Y_seven = [];
var Y_additional = []; 
var Y_six = []; 


for(var i = 0; i < 50; i++)
{
  Y_seven[i] = 0 ; 
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


  getTotos(): void {
    this.TotoService.getTotos()
      .then(totos => {
        this.totos = this.totos.concat(totos);
        //console.log(this.totos);
         this.totos.forEach( function (arrayItem)
         {
             //console.log(arrayItem);
             var additional = arrayItem.additional; 
             Y_seven[additional - 1] ++;
             Y_additional[additional - 1] ++; 
             var major = arrayItem.lucks; 
             major.forEach( function (luck)
             {
               Y_seven[luck - 1] ++;
               Y_six[luck - 1] ++;
             }); 
         }); 

        dict_seven      = create_dict(X, Y_seven);
        dict_six        = create_dict(X, Y_six);
        dict_additional = create_dict(X, Y_additional);

        this.drawBarChart($('#myChart'), Y_seven);   
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
      
        datasets: [{
          label: 'No. Winning',
          data: datalist,
          backgroundColor: color(COLORS.red).alpha(0.5).rgbString(),
        }],
      },
      
      options: {}
    });
  }
}
