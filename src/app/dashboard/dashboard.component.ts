import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  topCars : Car[];

  constructor(private carService : CarService) {}

  ngOnInit(): void {
    this.loadTopCars();
  }

  loadTopCars() {
    this.carService.getCars().subscribe((carList) => this.topCars = carList.slice(1,4));
  }

}
