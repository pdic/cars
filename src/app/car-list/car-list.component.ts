import { Component, OnInit } from '@angular/core';

import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars : Car[];
  selectedCar : Car;

  constructor(private carService : CarService) { }

  loadCars() {
    this.carService.getCars().subscribe(carList => this.cars = carList);
  }

  ngOnInit(): void {
    this.loadCars();
  }

  delete(id: number) {
    this.carService.deleteCar(id).subscribe();
    this.loadCars();
  }
}
