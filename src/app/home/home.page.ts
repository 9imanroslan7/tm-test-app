import { Component, ElementRef, ViewChild, AfterViewInit   } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { ArcElement, BarController, BarElement, BubbleController, CategoryScale, Chart, Decimation, DoughnutController, Filler, Legend, 
  LinearScale, LineController, LineElement, LogarithmicScale, PieController, PointElement, PolarAreaController, RadarController, 
  RadialLinearScale, ScatterController, TimeScale, TimeSeriesScale, Title, Tooltip } from 'chart.js';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild("barCanvas") private barCanvas: ElementRef;

  dates:any
  selected_date:any
  barChart: any;
  dataByDate:any
  
  constructor(
    private api:ApiServiceService,
  ) {
    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip
    );
    this.fetchAllData()
    this.fetchDateOnly()
    
  }

  ngAfterViewInit() {
    this.barChartMethod()
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: ['Pahang', 'Selangor', 'P.Pinang', 'Kedah', 'Kelantan', 'Johor'],
          datasets: [{
            label: 'Covid-19 New Cases',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
              // label: 'No of New Cases',
              // data: [12, 19, 3, 5, 2, 3],
              // backgroundColor: [
              //     'black',
              //     'rgba(54, 162, 235, 0.2)',
              //     'rgba(255, 206, 86, 0.2)',
              //     'rgba(75, 192, 192, 0.2)',
              //     'rgba(153, 102, 255, 0.2)',
              //     'rgba(255, 159, 64, 0.2)'
              // ],
              // borderColor: [
              //     'rgba(255, 99, 132, 1)',
              //     'rgba(54, 162, 235, 1)',
              //     'rgba(255, 206, 86, 1)',
              //     'rgba(75, 192, 192, 1)',
              //     'rgba(153, 102, 255, 1)',
              //     'rgba(255, 159, 64, 1)'
              // ],
              // borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });
  }

  fetchAllData(){
    this.api.fetchAllData().subscribe(
      data=>{
        console.log('all data',data);
      }
    )
  }

  fetchDateOnly(){
    this.api.fetchDateOnly().subscribe(
      data=>{
        console.log('all date only',data);
        this.dates=data['val']
      }
    )
  }

  fetchDataByDate(selected_date){
    // const body={dates:selected_date}
    const params = new HttpParams().set("dates", selected_date)
    this.api.fetchDataByDate(params).subscribe(
      data=>{
        console.log('data by date',data);
        this.dataByDate=data['val']
      }
    )
  }

  pickDate(event){
    console.log('selected date',event['detail'].value);
    this.selected_date=event['detail'].value
    this.fetchDataByDate(this.selected_date)
  }

}
