import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

  zoneEndPoint = 'https://api.track-covid19.in/history.json';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(this.zoneEndPoint).subscribe((zoneData) => {
      console.log(zoneData);
    })
  }

}
