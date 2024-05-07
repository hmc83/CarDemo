import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SignInComponent implements OnInit {


  @ViewChild('signInForm') signInForm: NgForm;
  userData: any;
  errorMessage: string = null;



  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    //In order to show error box when user was signed out automatically because of timed out
    this.route.queryParams.subscribe((q) => {
      if (q.autoSignOut){
        this.errorMessage = 'Session expired. Please sign in again. '
      }
    })
  }

  signInClicked(){
    this.errorMessage = null;
    this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password).subscribe({
      next: (responseObj) => {
        this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '' ]);
      }, 
      error: (err) => {
        this.errorMessage = err;
        console.log(err);
      }
    })
  }
}
