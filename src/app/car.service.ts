import { Injectable } from '@angular/core';
import { concat, merge, Observable, of, zip } from 'rxjs';
import { catchError, combineAll, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from './car';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsUrl = 'api/cars';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  sortOnBrand(a: Car, b: Car) : number { return a.brand > b.brand ? 1 : a.brand < b.brand ? -1 : 0} 
  sortOnModel(a: Car, b: Car) : number { return a.model > b.model ? 1 : a.model < b.model ? -1 : 0} 
  sortOnYom(a: Car, b: Car) : number { return a.yom > b.yom ? 1 : a.yom < b.yom ? -1 : 0} 
  
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl)
      .pipe(catchError(this.handleError<Car[]>('getCars', [])));
  }

  getCar(id: number): Observable<Car> {
  const url = `${this.carsUrl}/${id}`;
  return this.http.get<Car>(url).pipe(
    catchError(this.handleError<Car>(`getCars id=${id}`))
  );
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  searchCarsOnModel(term: string): Observable<Car[]> {
    if (!term.trim()) { return of([]); }

    return this.http.get<Car[]>(`${this.carsUrl}/?model=${term}`)
      .pipe(catchError(this.handleError<Car[]>('searchCars', [])));
  }
  
  searchCarsOnBrand(term: string): Observable<Car[]> {
    if (!term.trim()) { return of([]); }

    return this.http.get<Car[]>(`${this.carsUrl}/?brand=${term}`)
      .pipe(catchError(this.handleError<Car[]>('searchCars', [])));
  }

  searchCars(term: string, searchBy: string): Observable<Car[]> {
    if (!term.trim()) { return of([]); }

    return this.http.get<Car[]>(`${this.carsUrl}/?${searchBy}=${term}`)
      .pipe(catchError(this.handleError<Car[]>('searchCars', [])));
  }

  deleteCar(hero: Car | number): Observable<Car> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.carsUrl}/${id}`;
  
    return this.http.delete<Car>(url, this.httpOptions).pipe(
      catchError(this.handleError<Car>('deleteCar'))
    );
  }

  updateCar(car: Car) : Observable<any> {
    return this.http.put(this.carsUrl, car, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateHero')));
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car, this.httpOptions)
      .pipe(
        catchError(this.handleError<Car>('addCar')
      )
    );
  }

}