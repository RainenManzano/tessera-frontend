import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

const authRoutes: Routes = [
	{path: 'login', component: SignInComponent },
	{path: 'signup', component: SignUpComponent }
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(authRoutes),
		FormsModule
	],
	exports: [
		RouterModule, 
		FormsModule
	]
})

export class AuthenticationRoutingModule {}