import { ResolveFn } from "@angular/router";
import { WatchedCar } from "../models/watchedCar.model";
import { WatchlistStorageService } from "../services/watchlist-storage.service";
import { inject } from "@angular/core";
import { map, take } from "rxjs";


export const WatchListResolver: ResolveFn<WatchedCar[]> = () => {
    const watchlistStorageService = inject(WatchlistStorageService);
    if (watchlistStorageService.upToDate){
        return watchlistStorageService.getWatchedCarsFromLocal();
    }
    else {
        return watchlistStorageService.changedEmitter.pipe(
            take(1), 
            map(() => {
                return watchlistStorageService.getWatchedCarsFromLocal();
            })
        )
    }
}