import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  stateEndPoint = 'https://api.track-covid19.in/reports_v2.json';
  cards: {label: string; value: string;}[] = [];
  updatedOn: string = '';
  entireData: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(this.stateEndPoint).subscribe((stateData: any) => {
      console.log(stateData);
      this.initializeCardView(stateData?.today || {});
      this.updatedOn = stateData.updatedTime;
      this.entireData = [
        {label: 'Active', value: stateData.active},
        {label: 'Recovered', value: stateData.recovered},
        {label: 'Confirmed', value: stateData.confirmed},
        {label: 'Dead', value: stateData.dead}
      ]
    });
  }

  initializeCardView(data: any){
    this.cards = [];

    Object.keys(data).forEach((key) => {
      if(typeof data[key] == 'number'){
        let label = key.charAt(0).toUpperCase() + key.substr(1, key.length);
        this.cards.push({label, value: data[key]});
      }
    });
  }
}
