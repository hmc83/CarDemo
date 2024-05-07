import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  @Output() categoryEmitter = new EventEmitter<string>();

  EmitCategory(cat: string){
    this.categoryEmitter.emit(cat);
  }
}
