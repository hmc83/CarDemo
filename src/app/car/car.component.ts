import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from '../shared/models/car.model';
import { CarsStorageService } from '../shared/services/cars-storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {

  imagePath: string;
  sub: Subscription;

  constructor(private route: ActivatedRoute, private carsStorageService: CarsStorageService){
    
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((p) => {
      this.imagePath = this.carsStorageService.getCarFromLocalById(p['ownerId'], p['entryId']).imagePath;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
