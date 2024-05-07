import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../shared/models/car.model';
import { Subscription, take } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CarsStorageService } from '../../shared/services/cars-storage.service';
import { CarEntry } from '../../shared/models/carEntry.model';
import { PlaceholderDirective } from '../../shared/directives/placeholder.directive';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrl: './car-edit.component.css'
})
export class CarEditComponent implements OnInit, OnDestroy{

  car: Car;
  sub: Subscription;

  @ViewChild('editForm') f: NgForm;
  @ViewChild(PlaceholderDirective) placeholderDirective;
  
  constructor(private route: ActivatedRoute, private carsStorageService: CarsStorageService, private router: Router){}

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe((p) => {
      this.car = this.carsStorageService.getCarFromLocalById(p['ownerId'], p['entryId']);
    })

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  cancelClicked(){
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  resetClicked(){
    this.f.reset();
    this.f.setValue({title: this.car.title, engine: this.car.engine, kilometres: this.car.kilometres, price: this.car.price, imagePath: this.car.imagePath})
  }

  saveClicked(){
    const updatedCarEntry = new CarEntry(
      this.f.value.title,
      this.f.value.engine,
      this.f.value.kilometres,
      this.f.value.price, 
      this.f.value.imagePath
    );
    this.carsStorageService.updateCar(this.car.ownerId, this.car.entryId, updatedCarEntry).subscribe({
      next: () => {
        this.router.navigate(['/buy']);
      },
      error: (errMsg) => {
        console.log(errMsg);
      }
    })
  }

  deleteClicked(){
    this.showConfirmationModal().subscribe((emit) => {
      if (emit === "confirm"){
        this.carsStorageService.deleteCar(this.car.ownerId, this.car.entryId).subscribe({
          next: () => {
            this.router.navigate(['/buy']);
          },
          error: (errMsg) => {
            console.log(errMsg);
          }
        })
      }
      if (emit === "cancel"){
        this.removeConfirmationModal();
      }
    })
  }

  showConfirmationModal(){
    this.placeholderDirective.viewContainerRef.clear();
    const confirmationModalComponentRef = this.placeholderDirective.viewContainerRef.createComponent(ConfirmationModalComponent);
    confirmationModalComponentRef.instance.message = "Do you want to delete car permenantly?";
    return confirmationModalComponentRef.instance.emitter.pipe(take(1));
  }

  removeConfirmationModal(){
    this.placeholderDirective.viewContainerRef.clear();
  }
}
