import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Car } from '../shared/models/car.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CarsStorageService } from '../shared/services/cars-storage.service';
import { CarEntry } from '../shared/models/carEntry.model';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css'
})
export class SellComponent {

  @ViewChild('sellForm') f: NgForm;

  constructor(private carsStorageService: CarsStorageService, private router: Router){}


  SubmitClicked(){
    const carEntry = new CarEntry(
      this.f.value.title,
      this.f.value.engine,
      this.f.value.kilometres,
      this.f.value.price, 
      this.f.value.imagePath
    );

    this.carsStorageService.addCarEntry(carEntry).subscribe({
      next: () => {
        this.router.navigate(['buy']);
      },
      error: (errMsg) => {
        console.log(errMsg);
      }
    });
  }


  ClearClicked(){
    this.f.reset();
  }
}
