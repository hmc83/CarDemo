import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WatchedCar } from '../shared/models/watchedCar.model';
import { WatchlistStorageService } from '../shared/services/watchlist-storage.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements OnInit {

  watchedCars: WatchedCar[];

  constructor(private route: ActivatedRoute, private watchlistStorageService: WatchlistStorageService){}

  ngOnInit(){
    this.watchedCars = this.route.snapshot.data.watchedCars;
    this.watchlistStorageService.changedEmitter.subscribe(() => {
      this.watchedCars = this.watchlistStorageService.getWatchedCarsFromLocal();
    })
  }
  
  removeClicked(watchlistEntryId: string){
    this.watchlistStorageService.removeCarFromWatchlist(watchlistEntryId).subscribe({
      error: (errMsg) => {
        console.log(errMsg);
      }
    })
  }
}
