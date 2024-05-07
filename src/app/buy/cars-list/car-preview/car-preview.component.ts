import { Component, Input } from '@angular/core';
import { Car } from '../../../shared/models/car.model';
import { WatchlistStorageService } from '../../../shared/services/watchlist-storage.service';
import { AuthService } from '../../../shared/services/auth.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-preview',
  templateUrl: './car-preview.component.html',
  styleUrl: './car-preview.component.css'
})
export class CarPreviewComponent {

  @Input() watchlistEntryId: string;

  @Input() carToPreview: Car;

  constructor(private watchlistStorageService: WatchlistStorageService, private authService: AuthService, private router: Router){
  }

  saveClicked(){
    this.authService.emitter.pipe(take(1)).subscribe((user) => {
      if (user === null){
        this.router.navigate(['auth', 'signin'], {queryParams: {returnUrl: 'buy'}});
      }
      else{
        this.watchlistStorageService.addCarToWatchlist(this.carToPreview).subscribe({
          next: (response) => {
            this.watchlistEntryId = response.name;
          },
          error: (errMsg) => {
            console.log(errMsg);
          }
        });
      }
    });
  }

  unsaveClicked(){
    this.watchlistStorageService.removeCarFromWatchlist(this.watchlistEntryId).subscribe({
      next: () => {
        this.watchlistEntryId = null;
      }, 
      error: (errMsg) => {
        console.log(errMsg);
      }
    })
  }

}
