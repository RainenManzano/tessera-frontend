import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmailModalComponent } from './../email-modal/email-modal.component';

import { AuthenticationService } from './../../../services/authentication.service';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrls: ['verify-modal.component.css']
})

export class VerifyModalComponent implements OnInit{

	userId: string;
	token: string;
	email: string;
	verificationForm: FormGroup;

	constructor(public dialogRef: MatDialogRef<VerifyModalComponent>,
				public dialog: MatDialog,
				@Inject(MAT_DIALOG_DATA) public data: any,
				private _authenticationService: AuthenticationService,
				private _userService: UserService,
				private _router: Router) {}

	ngOnInit() {
		this.userId = this.data.userId;
		this.token = this.data.token;
		this.verificationForm = new FormGroup({
			"code": new FormControl(null, Validators.required)
		});
		this._userService.getSingleUserByToken(this.token).subscribe( (data) => {
			this.email = data[0].Company_Email;
		}, error => console.log(error));
	}

	onSubmit() {

		if(this.verificationForm.valid) {
			this._authenticationService.confirmCode(this.userId, this.verificationForm.value.code).subscribe( (data) => {
				if(data["message"]) {
					this._authenticationService.	storeInLocalStorage('currentUser', { 'token': this.token } );
					this.cancel();
					this._router.navigate(['sts']);
				} else {
					alert("Wrong verification code");
				}
			}, error => console.log(error));
		}

	}

	resendCode() {
		this._authenticationService.resendCode(this.userId).subscribe(
			(data) => {
				// console.log(data)
				alert("Code has been sent to your email account!");
			},
			error => console.log(error)
		);
	}

	openEmailDialog() {
		const dialogRef = this.dialog.open(EmailModalComponent, {
	    	data: {
	    		'email': this.email,
	    		'token': this.token
	    	}
	    });
	    dialogRef.afterClosed().subscribe(result => {
	    	if(typeof result!=='undefined')
	    		this.email = result;
	    });
	}

	cancel(): void {
		this.dialogRef.close();
	}


}