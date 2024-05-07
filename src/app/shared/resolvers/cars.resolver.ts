import { ResolveFn } from "@angular/router";
import { Car } from "../models/car.model";
import { CarsStorageService } from "../services/cars-storage.service";
import { inject } from "@angular/core";
import { map, take } from "rxjs";

export const CarsResolver: ResolveFn<Car[]> = () => {
    const carsStorageService = inject(CarsStorageService);
    if (carsStorageService.upToDate){
        return carsStorageService.getCarsFromLocal();
    }
    else {
        return carsStorageService.changedEmitter.pipe(
            take(1), 
            map(() => {
                return carsStorageService.getCarsFromLocal();
            })
        )
    }
}