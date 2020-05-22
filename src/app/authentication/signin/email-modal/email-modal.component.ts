import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { UserService } from './../../../services/user.service';

@Component({
  selector: 'email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['email-modal.component.css']
})

export class EmailModalComponent implements OnInit{
	token: string;
	email: string;
	emailForm: FormGroup;

	constructor(public dialogRef: MatDialogRef<EmailModalComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any,
				private _userService: UserService) {}

	ngOnInit() {
		// console.log(this.data);
		this.token = this.data.token;
		this.email = this.data.email;
		this.emailForm = new FormGroup({
			"email": new FormControl(this.email, [Validators.required, Validators.email], this.emailAlreadyExists.bind(this))
		});
	}

	onSubmit() {
		if(this.emailForm.valid) {
			this._userService.updateEmail(this.token, this.emailForm.get('email').value).subscribe( (data) => {
				// console.log(data);
				this.cancel(this.emailForm.get('email').value);
			}, error => console.log(error));
		}
	}

	cancel(email): void {
		this.dialogRef.close(email);
	}

	emailAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
		const email = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this._userService.doesEmailExists(email).subscribe((data: boolean) => {
				if(data == true) {
					this.emailForm.get("email").setErrors({emailExists: true});
				} else {
					this.emailForm.get("email").setErrors(null);
				}
			})
		})
		return promise;
	}






}