import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs'; 

import { UserService } from './../../../services/user.service';

@Component({
	selector: 'account-form',
	templateUrl: './account-form.component.html',
	styleUrls: ['account-form.component.css']
})

export class AccountFormComponent implements OnInit {
	accountForm: FormGroup;
	userInfo: any;
	cancelUsername: boolean = false;
	cancelPassword: boolean = false;

	constructor(private _userService: UserService) {}

	ngOnInit() {
		this.accountForm = new FormGroup({
			'username': new FormControl({value: '', disabled: true}, Validators.required, this.usernameAlreadyExists.bind(this)),
			'confirmpassword': new FormControl({value: '', disabled: true}, Validators.required, this.confirmPassword.bind(this)),
			'newpassword': new FormControl({value: '', disabled: true}, Validators.required, this.confirmPassword.bind(this)),
			'currentpassword': new FormControl({value: '', disabled: true}, Validators.required, this.passwordSame.bind(this)),
		});
		this._userService.getLoggedInUser().subscribe( (data) => {
			// console.log(data);
			this.userInfo = data[0];
			this.accountForm.patchValue({
				username: data[0].Username,
			});
		}, error => console.log(error));
		this._userService.bioChanged.subscribe( () => {
			this._userService.getLoggedInUser().subscribe( (data) => {
				// console.log(data);
				this.userInfo = data[0];
				this.accountForm.patchValue({
					username: data[0].Username,
				});
			}, error => console.log(error));
		}, error => console.log(error));
	}

	onSubmitAccountForm() {
		console.log(this.accountForm);
		if(this.accountForm.valid) {
			let username = this.accountForm.get('username').value;
			let newPassword = this.accountForm.get('newpassword').value;
			this._userService.updateUserAccount(username, newPassword).subscribe( () => {
				this.disableAccountForm(['username', 'currentpassword', 'newpassword', 'confirmpassword']);
				this.cancelUsername = false;
				this.cancelPassword = false;
			}, error => console.log(error));
		}
	}

	enableAccountForm(controls) {
		let current: string;
		for(let control of controls) {
			this.accountForm.get(control).enable();
			current = control;
		}
		if(current=="username") 
			this.cancelUsername = true;
		else if(current=="confirmpassword" || current=="newpassword" || current=="currentpassword")
			this.cancelPassword = true;
	}

	disableAccountForm(controls) {
		let current: string;
		for(let control of controls) {
			this.accountForm.get(control).disable();
			current = control;
		}
		if(current=="username") {
			this.cancelUsername = false;
			this.accountForm.patchValue({
				username: this.userInfo.Username
			});
		} else if(current=="confirmpassword" || current=="newpassword" || current=="currentpassword"){
			this.cancelPassword = false;
			this.accountForm.patchValue({
				confirmpassword: "",
				newpassword: "",
				currentpassword: "",
			});
		} 
	}

	usernameAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
		const username = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this._userService.doesUsernameExists(username).subscribe((data: boolean) => {
				if(data == true) {
					this.accountForm.get("username").setErrors({usernameExists: true});
				} else {
					this.accountForm.get("username").setErrors(null);
				}
			})
		})
		return promise;
	}

	passwordSame(control:FormControl): Promise<any>|Observable<any> {
		const password = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this._userService.passwordSame(password).subscribe((data: boolean) => {
				if(data == false) {
					this.accountForm.get("currentpassword").setErrors({passwordNotSame: true});
				} else {
					this.accountForm.get("currentpassword").setErrors(null);
				}
			})
		})
		return promise;
	}

	confirmPassword(control:FormControl): Promise<any>|Observable<any> {
		const newPassword = this.accountForm.get("newpassword").value;
		const confirmPassword = this.accountForm.get("confirmpassword").value;
		const promise = new Promise<any>((resolve, reject) => {
			if(newPassword==confirmPassword) {
				this.accountForm.get("confirmpassword").setErrors(null);
				this.accountForm.get("newpassword").setErrors(null);
			} else {
				this.accountForm.get("confirmpassword").setErrors({errorConfirm: true});
			}
		})
		return promise;
	}





	
}