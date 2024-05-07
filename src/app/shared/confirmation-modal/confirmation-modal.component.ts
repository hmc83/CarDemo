import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {

  //Message to be displayed in the alert box
  message: string;

  //Emitter
  emitter = new Subject<string>();

  //Emits 'confirm' when user confirms action
  confirmClicked(){
    this.emitter.next('confirm');
  }

  //Emits 'close' when user cancells action
  cancelClicked(){
    this.emitter.next('cancel');
  }
}
