import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { CarGuard } from './car.guard';
import { CarEditAuthorizeGuard } from './car-edit/car-edit-authorize.guard';


const routes: Routes = [
  { path: '', component: CarComponent, canActivate: [CarGuard], children: [
    { path: '', component: CarDetailComponent },
    { path: 'edit', component: CarEditComponent, canActivate: [CarEditAuthorizeGuard] }
  ]},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CarRoutingModule { }
