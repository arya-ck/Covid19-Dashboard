import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  allData: any;
  districtEndPoint = 'https://api.track-covid19.in/district_v2.json';
  stateNames: {statecode: string; state: string}[] = [];
  districtData: {name: string; active: number; recovered: number; dead: number; confirmed: number;}[] = [];
  @Input() selectedState = undefined;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initializeView();
  }

  initializeView(){
    this.http.get(this.districtEndPoint).subscribe((districtData) => {
      // console.log(districtData);
      this.allData = districtData;
      this.initializeStateDropdown(districtData);
    })
  }

  initializeStateDropdown(stateData: any){
    if(stateData){
      Object.keys(stateData).forEach((stateCode) => {
        let {state} = Array.isArray(stateData[stateCode])? stateData[stateCode][0]: stateData[stateCode];
        this.stateNames.push({state, statecode: stateCode});
      });
    }
  }

  initializeTable(){
    if(this.selectedState){
      let stateData = this.allData[this.selectedState]?.districts || {};
      Object.keys(stateData).forEach((districtCode) => {
        let {district, active, confirmed, dead, recovered} = stateData[districtCode];
        this.districtData.push({name: district, active, confirmed, dead, recovered});
      });
    }
  }
}
