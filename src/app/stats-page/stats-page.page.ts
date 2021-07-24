import { Component, ElementRef, ViewChild, AfterViewInit   } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { ArcElement, BarController, BarElement, BubbleController, CategoryScale, Chart, Decimation, DoughnutController, Filler, Legend, 
  LinearScale, LineController, LineElement, LogarithmicScale, PieController, PointElement, PolarAreaController, RadarController, 
  RadialLinearScale, ScatterController, TimeScale, TimeSeriesScale, Title, Tooltip } from 'chart.js';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.page.html',
  styleUrls: ['./stats-page.page.scss'],
})
export class StatsPagePage {
  @ViewChild("cumuCanvas") private cumuCanvas: ElementRef;
  data:any
  state=[]
  cumulativeCase=[]
  barChart: Chart
  hasEnter=false
  constructor(private api:ApiServiceService) 
  {
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
    this.hasEnter=true
  }

  ngAfterViewInit() {
    //this.barChartMethod()
    
  }

  ionViewWillEnter(){
    console.log('will enter statistic page')
    // this.fetchCumulativeAllState()
    
  }

  ionViewDidEnter(){
    this.fetchCumulativeAllState()
  }

  ionViewWillLeave(){
    console.log('will leave statistic page');
    this.barChart.destroy()
    this.state=[]
    this.cumulativeCase=[]
  }

  fetchCumulativeAllState(){
    this.api.fetchCumulativeAllState().subscribe(
      data=>{
        console.log('cumu',data);
        this.data=data
        for(var a=0;a<this.data.length;a++){
          this.state.push(this.data[a].state)
          this.cumulativeCase.push(this.data[a].cumu)
        }
        console.log('state array',this.state)
        console.log('cumu array',this.cumulativeCase)
        this.barChartMethod(this.state,this.cumulativeCase)
      }
    )
  }

  barChartMethod(state,data) {
    this.barChart = new Chart(this.cumuCanvas.nativeElement, {
      type: 'bar',
      data: {
          labels:state,
          datasets: [{
              label: 'No of Cases',
              data: data,
              backgroundColor: [
                "rgba(255, 0, 0, 0.2)",
                "rgba(255, 128, 0, 0.2)",
                "rgba(255, 255, 0, 0.2)",
                "rgba(0,255,0, 0.2)",
                "rgba(0,0,255, 0.2)",
                "rgba(0,255,255, 0.2)",
                "rgba(255,0,255, 0.2)",
                "rgba(0,128,0, 0.2)",
                "rgba(0,128,128, 0.2)",
                "rgba(75,0,130, 0.2)",
                "rgba(255,20,147, 0.2)",
                "rgba(139,69,19, 0.2)",
                "rgba(112,128,144, 0.2)",
                "rgba(25,25,112, 0.2)",
                "rgba(0,206,209, 0.2)",
                "rgba(0,100,0, 0.2)"
              ],
              borderColor: [
                "rgba(255,0,0,1)",
                "rgba(255, 128, 0, 1)",
                "rgba(255, 255, 0, 1)",
                "rgba(0,255,0, 1)",
                "rgba(0,0,255, 1)",
                "rgba(0,255,255, 1)",
                "rgba(255,0,255,1)",
                "rgba(0,128,0, 1)",
                "rgba(0,128,128, 1)",
                "rgba(75,0,130, 1)",
                "rgba(255,20,147, 1)",
                "rgba(139,69,19, 1)",
                "rgba(112,128,144,1)",
                "rgba(25,25,112, 1)",
                "rgba(0,206,209, 1)",
                "rgba(0,100,0, 1)",
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive:true,
        maintainAspectRatio:false,
        indexAxis:'y',
        events:['click'],
          scales: {
            x:{
              ticks:{
                autoSkip:false
              }
            },
              y: {
                ticks:{
                  autoSkip:false
                },
                beginAtZero: true,
                min:0,
                max:1000
              }
          }
      }
    });
  }

}
