import { Component, Input, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Car } from '../car';
import { CarService } from '../car.service';
import { ActivatedRoute } from '@angular/router';
import { MatButton } from '@angular/material/button'


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  car0: Car;

  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private carService: CarService,
    ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if(id > 0) {
      this.getCar();
    }
    else {
      this.addInit();
    }
  }

  getCar() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.carService.getCar(id).subscribe(c => this.car = c);
  }

  goBack() {
    this.location.back();
  }

  save(): void {
    this.carService.updateCar(this.car)
      .subscribe(() => this.isEdit = false);
  }

  addInit(): void {
    this.car0 = this.car; // backup
    this.car = {
      brand: "",
      type: "",
      model: "",
      color: "",
      yom: 0,
      price: 0,
      imageUrl: ""
    } as Car;
    this.isEdit = true;
  }

  add(): void {
    this.carService.addCar(this.car).subscribe((newCar) => this.car = newCar);
    this.isEdit = false;
  }

  edit(): void { this.isEdit = true; }

}
