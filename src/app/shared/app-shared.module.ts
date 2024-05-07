import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatPipe } from './pipes/format.pipe';



@NgModule({
  declarations: [
    FormatPipe
  ],
  imports: [
  ], 
  exports: [
    FormatPipe
  ]
})
export class AppSharedModule { }
