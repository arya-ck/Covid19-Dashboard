import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {

  districtEndPoint = 'https://api.track-covid19.in/district_v2.json';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(this.districtEndPoint).subscribe((districtData) => {
      console.log(districtData);
    })
  }

}
