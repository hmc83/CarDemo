import { NgModule } from '@angular/core';
import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { FeatureSharedModule } from '../shared/feature-shared.module';
import { CarRoutingModule } from './car-routing.module';
import { AppSharedModule } from '../shared/app-shared.module';



@NgModule({
  declarations: [
    CarComponent,  
    CarDetailComponent,
    CarEditComponent, 
  ],
  imports: [
    FeatureSharedModule, CarRoutingModule, AppSharedModule
  ]
})
export class CarModule { }
