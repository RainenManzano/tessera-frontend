import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AuthenticationService } from './../../services/authentication.service';

import { UserLogin } from './../../models/user-login.model';

import { VerifyModalComponent } from './verify-modal/verify-modal.component';

import { ImagesLocation } from './../../system/locations';

@Component({
	selector: "app-login",
	styleUrls: ["./signin.component.css"],
	templateUrl: "./signin.component.html"
})

export class SignInComponent implements OnInit{

	signInForm: FormGroup;
	loginData: UserLogin;
	location: string;

	constructor(private router: Router, 
				private authenticationService: AuthenticationService,
				public dialog: MatDialog) {}

	ngOnInit() {
		this.location = ImagesLocation;
		this.signInForm = new FormGroup({
			'username': new FormControl(null, Validators.required),
			'password': new FormControl(null, Validators.required)
		})
	}

	getErrorUsername() {
	    return this.signInForm.get('username').hasError('required')? 'Username is required': '';
	}

	getErrorPassword() {
		return this.signInForm.get("password").hasError("required")? 'Password is required': '';
	}

	onLogin() {
		this.loginData = new UserLogin(this.signInForm.value.username,this.signInForm.value.password);
		this.authenticationService.checkLoginInfo(this.loginData).subscribe(
			(data) => {
				// console.log(data)
				if(data["isActivated"]==="1") {
					this.authenticationService.
						storeInLocalStorage('currentUser', { 'token': data['token'] } );
					this.router.navigate(['/sts']);
				} else if(data["isActivated"]==="0") {
					this.openVerificationDialog(data["userId"], data['token']);
				} else {
					this.signInForm.setErrors({"invalidUP": true});
				}
			}, 
			(error) => {
				console.log(error);
			}
		);
	}

	openVerificationDialog(userId, token): void {
		const dialogRef = this.dialog.open(VerifyModalComponent, {
	    	data: {
	    		'userId': userId,
	    		'token': token
	    	}
	    });
	    dialogRef.afterClosed().subscribe(result => {
	    	console.log('The dialog was closed');
	    });
	}	

}
