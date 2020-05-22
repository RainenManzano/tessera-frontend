import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../angular.material';	
import { PipesModule } from './../pipes/pipes.module';	
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { SignInComponent } from './signin/signin.component';
import { VerifyModalComponent } from './signin/verify-modal/verify-modal.component';
import { EmailModalComponent } from './signin/email-modal/email-modal.component';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
	declarations: [
		SignInComponent,
		VerifyModalComponent,
		EmailModalComponent,
		SignUpComponent
	],
	imports: [
		CommonModule,
		AngularMaterialModule,
		ReactiveFormsModule,
		AuthenticationRoutingModule,
		PipesModule
	],
	entryComponents: [
		VerifyModalComponent,
		EmailModalComponent
	]
})

export class AuthenticationModule {

}