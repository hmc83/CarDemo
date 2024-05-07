import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignUpComponent implements OnInit{

  signUpFormGroup: FormGroup;
  errorMessage: string = null;

  constructor(private authService: AuthService, private router: Router){}
  
  ngOnInit(): void {
    this.signUpFormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required])
    });

    const passwordControl = this.signUpFormGroup.get('password');
    const match: ValidatorFn = (confirmPasswordControl: FormControl) => {
      if (confirmPasswordControl.value === passwordControl.value){
        return null;
      }
      else {
        return {'match' : true};
      }
    }

    this.signUpFormGroup.get('confirmPassword').addValidators(match);
  }

  signUpClicked(){
    this.errorMessage = null;
    this.authService.signUp(this.signUpFormGroup.value.email, this.signUpFormGroup.value.password).subscribe({
      next: () => {
        this.router.navigate(['buy']);
      },
      error: (err) => {
        this.errorMessage = err;
        console.log(err);
      }
    });
  }
}
