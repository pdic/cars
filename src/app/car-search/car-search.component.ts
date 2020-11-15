import { Component, OnInit } from '@angular/core';
import { concat, merge, Observable, Subject, zip, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, subscribeOn, switchMap } from 'rxjs/operators';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css']
})
export class CarSearchComponent implements OnInit {

  
  searchItems: string[] = ["brand", "model", "color"];
  selectedSearch: string = "brand";

  cars$: Observable<Car[]>;
  searchText: string;
  private searchTerms = new Subject<string>();
  
  constructor(private carService: CarService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cars$ = this.searchTerms
          .pipe(
            debounceTime(300), // wait 300 ms
            distinctUntilChanged(), // ignore term if same
            switchMap((term: string) => this.carService.searchCars(term, this.selectedSearch)),
          );
  }


}
