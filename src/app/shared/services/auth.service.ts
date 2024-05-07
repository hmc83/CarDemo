import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpResponseInterface } from '../interfaces/signUpResponse.interface';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { SignInResponseInterface } from '../interfaces/signInResponse.interface';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  emitter: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private authTimeoutRef: any = null;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string){
    return this.http.post<SignUpResponseInterface>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(tap(this.handleResponse), catchError(this.handleError));
  }

  signIn(email: string, password: string){
    return this.http.post<SignInResponseInterface>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(tap(this.handleResponse), catchError(this.handleError));
  }

  private handleResponse = (responseObj: SignUpResponseInterface | SignInResponseInterface) => {
    const timeToExpiration = Number(responseObj.expiresIn)*1000; //*1000 to convert to milliseconds
    const expirationDate = new Date(new Date().getTime() + timeToExpiration);
    const user = new User(responseObj.email, responseObj.localId, responseObj.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user)); //Persist user data in local storage of the browser. 
    this.emitter.next(user);
    this.autoSignOut(timeToExpiration);
  }

  private handleError = (errResponse: HttpErrorResponse) => {
    this.emitter.next(null);
    let err: string = 'An unknown error occured.';
    if (errResponse.error && errResponse.error.error){
      switch (errResponse.error.error.message){
        case "EMAIL_EXISTS":
          err = 'The email address is already in use by another account.';
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          err = 'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          err = 'The email and password does not match.';
          break;
      }
    }
    return throwError(() => err)
  }

  signOut(auto? : boolean){
    //Remove any timeout since user will be signed out anyway
    if (this.authTimeoutRef){
      clearTimeout(this.authTimeoutRef);
      this.authTimeoutRef = null;
    }
    //Remove persistance from local storage
    localStorage.removeItem('userData');
    //Actually signing out user
    this.emitter.next(null);
    //Navigate to Sign In page after signing out, attach query params depending on whether signing out was auto or not
    if(auto){
      this.router.navigate(['auth', 'signin'], {queryParams: {autoSignOut: true}});
    }
    else {
      this.router.navigate(['auth', 'signin']);
    }
  }

  autoSignOut(timeToExpiration: number){
    this.authTimeoutRef = setTimeout(() => {
      console.log('auto signing out');
      this.signOut(true);
    }, timeToExpiration);
  }
  
  autoSignIn(){
    const userData = JSON.parse(localStorage.getItem('userData')); //attempt to retrieve user from local storage
    if (!userData){
      return;
    }

    const user: User = new User(
      userData.email, 
      userData.id, 
      userData._token, 
      userData._tokenExpirationDate
    );

    if (user.token){ //check if user log is still valid (i.e. not expired)
      this.emitter.next(user);
      const timeToExpiration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(timeToExpiration);
    }
  }


}
