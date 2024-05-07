import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, map, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { WatchedCar } from '../models/watchedCar.model';
import { Car } from '../models/car.model';
import  deepClone  from '../../../../node_modules/lodash-es/cloneDeep.js'

@Injectable({
  providedIn: 'root'
})
export class WatchlistStorageService {
  
  changedEmitter: EventEmitter<void> = new EventEmitter<void>();   //emits whenever local copy is updated
  watchedCarsLocalCopy: WatchedCar[];
  user: User;
  upToDate: boolean = false;


  constructor(private authService: AuthService, private http: HttpClient) { 
    //Whenever the logging status changes, watchledCarsLocalCopy is updated
    this.authService.emitter.subscribe((user) => {
      this.upToDate = false;
      this.user = user;
      if(user === null){
        this.watchedCarsLocalCopy = [];
        this.upToDate = true;
      }
      else {
        this.updateLocalCopy();
      }
    })
  }


  //LOAD
  updateLocalCopy(){
    this.http.get(`https://cars-demo-fa33c-default-rtdb.firebaseio.com/watchlistStorage/${this.user.id}.json?auth=${this.user.token}`).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    ).subscribe({
      next: (watchedCars) => {
        this.watchedCarsLocalCopy = watchedCars;
        this.upToDate = true;
        this.changedEmitter.emit();
      },
      error: (errMsg) => {
        console.log(errMsg)
      }
    })
  }

    //GET
    getWatchedCarsFromLocal(){
      return deepClone(this.watchedCarsLocalCopy);
    }

  //ADD
  addCarToWatchlist(car: Car){
    return this.http.post<{name: string}>(`https://cars-demo-fa33c-default-rtdb.firebaseio.com/watchlistStorage/${this.user.id}.json?auth=${this.user.token}`, car).pipe(
      tap(() => {
        this.upToDate = false;
        this.updateLocalCopy(); 
      }),
      catchError(this.handleError)
    )
  }

  //DELETE
  removeCarFromWatchlist(watchlistEntryId: string){
    return this.http.delete(`https://cars-demo-fa33c-default-rtdb.firebaseio.com/watchlistStorage/${this.user.id}/${watchlistEntryId}.json?auth=${this.user.token}`).pipe(
      tap(() => {
        this.upToDate = false;
        this.updateLocalCopy(); 
      }),
      catchError(this.handleError)
    )
  }

  //HANDLE RESPONSE
  private handleResponse = (response: { [watchlistEntryId: string]: Car } ) => {
    let watchedCarsFromDatabase : WatchedCar[] = [];
    if (response){
      for (const [watchlistEntryId, car] of Object.entries(response)){
        watchedCarsFromDatabase.push(new WatchedCar(this.user.id, watchlistEntryId, car.ownerId, car.entryId, car.title, car.engine, car.kilometres, car.price, car.imagePath ));
      }
    }
    return watchedCarsFromDatabase;
  }


  //HANDLE ERROR
  private handleError(err: string | HttpErrorResponse){
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
