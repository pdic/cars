import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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

  getCarsSub : Subscription;
  deleteCarSub : Subscription;

  constructor(private carService : CarService) { }

  loadCars() {
    this.getCarsSub = this.carService.getCars().subscribe(carList => this.cars = carList);
  }

  ngOnInit(): void {
    this.loadCars();
  }

  delete(id: number) {
    this.deleteCarSub = this.carService.deleteCar(id).subscribe();
    this.loadCars();
  }

  ngOnDestroy() {
    this.getCarsSub?.unsubscribe(); 
    this.deleteCarSub?.unsubscribe(); 
  }
}
