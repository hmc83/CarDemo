import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, exhaustMap, map, take, tap, throwError } from 'rxjs';
import { Car } from '../models/car.model';
import { CarEntry } from '../models/carEntry.model';
import { CarsResponse } from '../interfaces/carsResponse.type';
import  deepClone  from '../../../../node_modules/lodash-es/cloneDeep.js'

@Injectable({
  providedIn: 'root'
})
export class CarsStorageService {

  changedEmitter: EventEmitter<void> = new EventEmitter<void>();   //emits whenever local copy is updated
  carsLocalCopy: Car[];
  carsResponse: CarsResponse;
  upToDate: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.updateLocalCopy();
  }

  //LOAD
  updateLocalCopy(){
    this.http.get<CarsResponse>(`https://cars-demo-fa33c-default-rtdb.firebaseio.com/carsStorage.json`).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    ).subscribe({
      next: (cars) => {
        this.carsLocalCopy = cars;
        this.upToDate = true;
        this.changedEmitter.emit();
      },
      error: (errMsg) => {
        console.log(errMsg)
      }
    })
  }

  //GET
  getCarsFromLocal(){
    return deepClone(this.carsLocalCopy);
  }

  getCarFromLocalById(ownerId: string, entryId: string){
    try{
      const carEntry = this.carsResponse[ownerId][entryId];
      return new Car(ownerId, entryId, carEntry.title, carEntry.engine, carEntry.kilometres, carEntry.price, carEntry.imagePath );
    }
    catch {
      return null;
    }
  }

  //ADD (POST)
  addCarEntry(carEntry: CarEntry){
    return this.authService.emitter.pipe(
      take(1), 
      exhaustMap((user) => {
        if (user === null || user.token === null){
          return throwError(() => 'not logged in');
        }
        return this.http.post(`https://cars-demo-fa33c-default-rtdb.firebaseio.com/carsStorage/${user.id}.json?auth=${user.token}`, carEntry);
      }), 
      tap(() => {
        this.upToDate = false;
        this.updateLocalCopy();
      }),
      catchError(this.handleError)
    );
  }

  //UPDATE (PUT)
  updateCar(ownerId: string, entryId: string, updatedCarEntry: CarEntry){
    return this.authService.emitter.pipe(
      take(1), 
      exhaustMap((user) => {
        if (user === null || user.token === null){
          return throwError(() => 'not logged in');
        }
        return this.http.put(`https://cars-demo-fa33c-default-rtdb.firebaseio.com/carsStorage/${ownerId}/${entryId}.json?auth=${user.token}`, updatedCarEntry);
      }), 
      tap(() => {
        this.upToDate = false;
        this.updateLocalCopy();
      }),
      catchError(this.handleError)
    );
  }

  //DELETE
  deleteCar(ownerId: string, entryId: string){
    return this.authService.emitter.pipe(
      take(1), 
      exhaustMap((user) => {
        if (user === null || user.token === null){
          return throwError(() => 'not logged in');
        }
        return this.http.delete(`https://cars-demo-fa33c-default-rtdb.firebaseio.com/carsStorage/${ownerId}/${entryId}.json?auth=${user.token}`);
      }), 
      tap(() => {
        this.upToDate = false;
        this.updateLocalCopy();
      }),
      catchError(this.handleError)
    );
  }

  //HANDLE RESPONSE
  private handleResponse = (response: CarsResponse) => {
    this.carsResponse = response;
    let carsFromDatabase : Car[] = [];
    if (response){
      for (const ownerId of Object.keys(response)){
        for (const [entryId, carEntry] of Object.entries(response[ownerId])){
          carsFromDatabase.push(new Car(ownerId, entryId, carEntry.title, carEntry.engine, carEntry.kilometres, carEntry.price, carEntry.imagePath ));
        }
      }
    }
    return carsFromDatabase;
  }

  //HANDLE ERROR
  private handleError = (err: string | HttpErrorResponse) => {
    let errMsg: string = "unknown error";
    if (typeof err === "string"){
      errMsg = err;
    }
    else {
      if (err.error && err.error.error){
        errMsg = err.error.error;
      }
    }
    return throwError(() => errMsg);
  }
}
