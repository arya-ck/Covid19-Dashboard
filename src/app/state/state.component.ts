import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  stateEndPoint = 'https://api.track-covid19.in/reports_v2.json';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: { chart: { data: { labels: { [x: string]: any; }; }; }; dataIndex: string | number; }) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  stateData: {name: string; active: string; confirmed: string; dead: string; recovered: string}[] = [];
  selectedState: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(this.stateEndPoint).subscribe((stateData: any) => {
      console.log(stateData);

      this.initializePieChart(stateData);

      this.initializeTable(stateData);

    });
  }

  setSelectedState(state: any){
    this.selectedState = state;
    this.initializePieChart(state);
  }

  initializeTable(stateData: any){
    if(stateData.states){
      Object.keys(stateData.states).forEach((stateCode) => {
        let {name, active, confirmed, dead, recovered} = stateData.states[stateCode];
        this.stateData.push({name, active, confirmed, dead,recovered});
      });
    }
  }

  initializePieChart(data: any){
    this.pieChartLabels = [];
    this.pieChartData = [];
    Object.keys(data).forEach((key) => {
      if(typeof data[key] == 'number'){
        let label = key.charAt(0).toUpperCase() + key.substr(1, key.length);
        this.pieChartLabels.push(label);
        this.pieChartData.push(data[key]);
      }
    });
  }
}
