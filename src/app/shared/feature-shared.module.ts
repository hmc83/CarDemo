import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfirmationModalComponent, //SharedModule --> CarModule
    PlaceholderDirective //SharedModule --> CarModule
  ],
  imports: [
    CommonModule, //SharedModule --> CarModule, AuthModule
    FormsModule, //SharedModule --> CarModule, AuthModule
    ReactiveFormsModule //SharedModule --> CarModule, AuthModule
  ],
  exports: [
    ConfirmationModalComponent,
    PlaceholderDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FeatureSharedModule { }
