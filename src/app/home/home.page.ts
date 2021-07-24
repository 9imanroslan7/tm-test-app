import { Component, ElementRef, ViewChild, AfterViewInit   } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { ArcElement, BarController, BarElement, BubbleController, CategoryScale, Chart, Decimation, DoughnutController, Filler, Legend, 
  LinearScale, LineController, LineElement, LogarithmicScale, PieController, PointElement, PolarAreaController, RadarController, 
  RadialLinearScale, ScatterController, TimeScale, TimeSeriesScale, Title, Tooltip } from 'chart.js';
import { HttpParams } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild("barCanvas") private barCanvas: ElementRef;

  dates:any
  canvasUsed=false
  showData=false
  selected_date:any
  barChart: Chart
  dataByDate:any
  totalCase:any
  totalState:any
  caseArray=[]

  
  constructor(
    private api:ApiServiceService,
    private loading:LoadingService
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
    //this.barChartMethod()
  }

  barChartMethod(state,caseArray) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
          labels:state,
          datasets: [{
              label: 'No of Cases',
              data: caseArray,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)"
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1
          }]
      },
      options: {
        //events:[''],
          scales: {
              y: {
                  beginAtZero: true,
                  min:0,
                  max:250
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

  pickDate(event){
    console.log('selected date',event['detail'].value);
    this.selected_date=event['detail'].value
    this.fetchDataByDate(this.selected_date)
  }

  fetchDataByDate(selected_date){
    const params = new HttpParams().set("dates", selected_date)
    this.api.fetchDataByDate(params).subscribe(
      data=>{
        console.log('data by date',data);
        this.showData=true
        this.dataByDate=data['val']
        this.totalCase=data['total']
        this.totalState=data['state']
        this.caseArray=data['caseArray']
        if(this.canvasUsed==true){
          this.barChart.data.labels=this.totalState
          this.barChart.data.datasets[0].data=this.caseArray
          this.barChart.update()
        }else{
          this.canvasUsed=true
          this.barChartMethod(this.totalState,this.caseArray)
        }
      }
    )
  }



}
