import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historyEndPoint = 'https://api.track-covid19.in/history.json';
  historicalData: any;

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Confirmed' },
    { data: [], label: 'Active' },
    { data: [], label: 'Recovered' },
    { data: [], label: 'Dead' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(this.historyEndPoint).subscribe((historicalData) => {
      // console.log(historicalData);
      this.historicalData = historicalData;
      this.initializeLineChart();
    });
  }

  initializeLineChart(){
    this.historicalData.india.forEach((data: {date: string; active: string; confirmed: string; dead: string; recovered: string;}) => {
      let {date, active, confirmed, dead, recovered} = data;
      this.lineChartData[0].data?.push(parseInt(confirmed));
      this.lineChartData[1].data?.push(parseInt(active));
      this.lineChartData[2].data?.push(parseInt(recovered));
      this.lineChartData[2].data?.push(parseInt(dead));

      this.lineChartLabels.push(date);
    });
  }

}
