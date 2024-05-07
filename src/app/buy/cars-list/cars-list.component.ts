import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Car } from '../../shared/models/car.model';
import { Subscription } from 'rxjs';
import { CarsStorageService } from '../../shared/services/cars-storage.service';
import { WatchedCar } from '../../shared/models/watchedCar.model';
import { ActivatedRoute } from '@angular/router';
import { WatchlistStorageService } from '../../shared/services/watchlist-storage.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.css'
})
export class CarsListComponent implements OnInit, OnDestroy {

  private _mode: string;
  @Input() set mode(value: string){
    if (value !== undefined){
      this._mode = value;
      this.loadCars();
    }
  }

  get mode(){
    return this._mode;
  }
  
  carsSub: Subscription;
  watchedSub: Subscription;

  count: number;

  cars: Car[];
  watchedCars: WatchedCar[];

  constructor(private carsStorageService: CarsStorageService, private watchlistStorageService: WatchlistStorageService, private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.cars = this.activatedRoute.snapshot.data.cars;
    this.count = this.cars.length;
    this.watchedCars = this.activatedRoute.snapshot.data.watchedCars;
    this.carsSub = this.carsStorageService.changedEmitter.subscribe(() => {
      this.loadCars();
    })
    this.watchedSub = this.watchlistStorageService.changedEmitter.subscribe(() => {
      this.loadWatchedCars();
    })
  }

  ngOnDestroy(){
    this.carsSub.unsubscribe();
    this.watchedSub.unsubscribe();
  }

  private loadWatchedCars(){
    this.watchedCars = this.watchlistStorageService.getWatchedCarsFromLocal();
  }

  private loadCars(){
    if (this.mode){
      this.cars = this.carsStorageService.getCarsFromLocal().filter((car: Car) => car.engine === this.mode);
    }
    else {
      this.cars = this.carsStorageService.getCarsFromLocal();
    }
    this.count = this.cars.length;
  }

  getWatchedListEntryId(car: Car): string{
    let watchedListEntryId: string = null;
    for (const watchedCar of this.watchedCars){
      if (car.ownerId === watchedCar.ownerId && car.entryId === watchedCar.entryId){
        watchedListEntryId = watchedCar.watchlistEntryId;
      }
    }
    return watchedListEntryId;
  }

}
