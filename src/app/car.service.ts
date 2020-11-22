import { Injectable } from '@angular/core';
import { concat, merge, Observable, of, zip } from 'rxjs';
import { catchError, combineAll, map, tap, filter } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Car } from './car';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  httpOptions = {
    headers: new HttpHeaders(
      { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    )
  };

  
  constructor(private http: HttpClient) { }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>('api/getcars')
      .pipe(catchError(this.handleError<Car[]>('getCars', [])));
  }

  getCar(id: number): Observable<Car> {
    const url = `api/getcars/${id}`;
    return this.http.get<Car>(url)
      .pipe(catchError(this.handleError<Car>(`getCars id=${id}`)));
  }

  deleteCar(car: Car | number): Observable<Car> {
    const id = typeof car === 'number' ? car : car.id;
    const url = `api/deletecar/${id}`;
  
    return this.http.delete<Car>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Car>('deleteCar')));
  }

  updateCar(car: Car) : Observable<any> {
    return this.http.put('/api/updatecar', car, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateCar')));
  }
  
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>('api/addcar', car, this.httpOptions)
      .pipe(catchError(this.handleError<Car>('addCar')));
  }

  // Search methods
  searchCarsOnModel(term: string): Observable<Car[]> {
    if (!term.trim()) { return of([]); }

    return this.http.get<Car[]>('api/getcars')
      .pipe(
        map(x => x.filter(x => x.model.toUpperCase().indexOf(term.toUpperCase()) >= 0)),
        catchError(this.handleError<Car[]>('searchCars', []))
      );
  }
  
  searchCarsOnBrand(term: string): Observable<Car[]> {
    if (!term.trim()) { return of([]); }
    return this.http.get<Car[]>('api/getcars')
      .pipe(
        map(x => x.filter(x => x.brand.toUpperCase().indexOf(term.toUpperCase()) >= 0)),
        catchError(this.handleError<Car[]>('searchCars', []))
    );
  }

  searchCarsOnColor(term: string): Observable<Car[]> {
    if (!term.trim()) { return of([]); }
    return this.http.get<Car[]>('api/getcars')
      .pipe(
        map(x => x.filter(x => x.color.toUpperCase().indexOf(term.toUpperCase()) >= 0)),
        catchError(this.handleError<Car[]>('searchCars', []))
    );
  }

  searchCars(term: string, searchBy: string): Observable<Car[]> {
    if (!term.trim()) { return of([]); }

    return this.http.get<Car[]>(`api/searchcars/?${searchBy}=${term}`)
      .pipe(
        catchError(this.handleError<Car[]>('searchCars', []))
      );
  }

}