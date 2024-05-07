import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false;
  email: string = "";
  sub: Subscription;
  
  constructor(private authService: AuthService){}

  ngOnInit(){
    this.sub = this.authService.emitter.subscribe((user: User) => {
      if (user){
        this.isAuthenticated = true;
      }
      if (user === null){
        this.isAuthenticated = false;
      }
    })
  }

  logOutClicked(){
    this.authService.signOut();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
