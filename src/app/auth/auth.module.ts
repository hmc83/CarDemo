import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './signin/signin.component';
import { FeatureSharedModule } from '../shared/feature-shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    AuthComponent, 
    SignInComponent, 
    SignUpComponent, 
  ],
  imports: [
    FeatureSharedModule, 
    AuthRoutingModule,
  ]
})
export class AuthModule { }
