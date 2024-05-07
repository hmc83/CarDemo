import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from '../../shared/models/car.model';
import { CarsStorageService } from '../../shared/services/cars-storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit, OnDestroy {

  car: Car = null;
  carSub: Subscription;
  showEdit: boolean = false;
  private user: User = null;
  userSub: Subscription;


  constructor(private route: ActivatedRoute, private carsStorageService: CarsStorageService, private authService: AuthService){}

  ngOnInit(): void {
    this.carSub = this.route.parent.params.subscribe((p) => {
      this.car = this.carsStorageService.getCarFromLocalById(p['ownerId'], p['entryId']);
      this.ownerCheck();
    });

    this.userSub = this.authService.emitter.subscribe((user) => {
      this.user = user;
      this.ownerCheck();
    });
  }

  ownerCheck(){
    if (this.car === null || this.user === null) {
      this.showEdit = false;
    }
    else if (this.car.ownerId === this.user.id){
      this.showEdit = true;
    }
    else {
      this.showEdit = false;
    }
  }

  ngOnDestroy(): void {
    this.carSub.unsubscribe();
  }
}
