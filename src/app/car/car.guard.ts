import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { CarsStorageService } from "../shared/services/cars-storage.service";
import { map, take } from "rxjs";

export const CarGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const carsStorageService = inject(CarsStorageService);
    const router = inject(Router);
    if (carsStorageService.upToDate){
        if (carsStorageService.getCarFromLocalById(route.params['ownerId'], route.params['entryId'])){
            return true;
        }
    }
    else {
        return carsStorageService.changedEmitter.pipe(
            take(1), 
            map(() => {
                if (carsStorageService.getCarFromLocalById(route.params['ownerId'], route.params['entryId'])){
                    return true;
                }
                return router.createUrlTree(['not-found']);
            })
        )
    }
}