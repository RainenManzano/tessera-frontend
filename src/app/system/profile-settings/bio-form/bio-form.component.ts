import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from './../../../services/user.service';
import { ProfilePicturesLocation } from './../../locations';
@Component({
	selector: 'app-bio-form',
	templateUrl: './bio-form.component.html',
	styleUrls: ['bio-form.component.css']
})

export class BioFormComponent implements OnInit {
	file: File;
	fileChanged: boolean = false;
	bioForm: FormGroup;
	userInfo: any;
	userInfoImg: string;
	cancelEmployeeId: boolean = false;
	cancelEmail: boolean = false;
	cancelName: boolean = false;

	constructor(private _userService: UserService) {}

	ngOnInit() {
		this.bioForm = new FormGroup({
			'employeeId': new FormControl({value: '', disabled: true}, Validators.required),
			'email': new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
			'firstname': new FormControl({value: '', disabled: true}, [Validators.required]),
			'middlename': new FormControl({value: '', disabled: true}, [Validators.required]),
			'lastname': new FormControl({value: '', disabled: true}, [Validators.required]),
		});
		this._userService.getLoggedInUser().subscribe( (data) => {
			this.userInfo = data[0];
			this.userInfoImg = ProfilePicturesLocation + data[0].Img_Name;
			this.bioForm.patchValue({
				employeeId: data[0].Employee_Id,
				email: data[0].Company_Email,
				firstname: data[0].Firstname,
				middlename: data[0].Middlename,
				lastname: data[0].Lastname,
			});
		}, error => console.log(error));
		this._userService.bioChanged.subscribe( () => {
			this._userService.getLoggedInUser().subscribe( (data) => {
				this.userInfo = data[0];
				this.bioForm.patchValue({
					employeeId: data[0].Employee_Id,
					email: data[0].Company_Email,
					firstname: data[0].Firstname,
					middlename: data[0].Middlename,
					lastname: data[0].Lastname,
				});
			}, error => console.log(error));
		}, error => console.log(error));
		this._userService.imageChanged.subscribe((image) => {
			this.userInfoImg = ProfilePicturesLocation + image;
		});
	}

	onSubmitBioForm() {
		// console.log(this.bioForm);
		if(this.bioForm.valid) {
			let id = this.bioForm.get('employeeId').value;
			let email = this.bioForm.get('email').value;
			let firstname = this.bioForm.get('firstname').value;
			let middlename = this.bioForm.get('middlename').value;
			let lastname = this.bioForm.get('lastname').value;
			this._userService.updateUserBio(id, email, firstname, middlename, lastname).subscribe( () => {
				this._userService.bioChanged.next();
				this.disableBioForm(['employeeId', 'email', 'firstname', 'middlename', 'lastname']);
				this.cancelEmployeeId = false;
				this.cancelEmail = false;
				this.cancelName = false;
			}, error => console.log(error));
		}
	}

	fileChange(event) {
		let tempFile: File = event.target.files[0];
		if(tempFile) {
			this.fileChanged = true;
			this.file = tempFile;
		} else {
			this.fileChanged = false;
		}
	}

	changePicture() {
		this._userService.changeProfilePicture(this.file).subscribe( (newFilename) => {
			this._userService.imageChanged.next(newFilename);
			this.fileChanged = false;
		}, error => console.log(error));
	}

	enableBioForm(controls) {
		// console.log(controls);
		let current: string;
		for(let control of controls) {
			this.bioForm.get(control).enable();
			current = control;
		}
		if(current=="employeeId") 
			this.cancelEmployeeId = true;
		else if(current=="email")
			this.cancelEmail = true;
		else if(current=="lastname")
			this.cancelName = true;
	}

	disableBioForm(controls) {
		// console.log(controls);
		let current: string;
		for(let control of controls) {
			this.bioForm.get(control).disable();
			current = control;
		}
		if(current=="employeeId") {
			this.cancelEmployeeId = false;
			this.bioForm.patchValue({
				employeeId: this.userInfo.Employee_Id
			});
		} else if(current=="email"){
			this.cancelEmail = false;
			this.bioForm.patchValue({
				email: this.userInfo.Company_Email
			});
		} else if(current=="lastname"){
			this.cancelName = false;
			this.bioForm.patchValue({
				firstname: this.userInfo.Firstname,
				middlename: this.userInfo.Middlename,
				lastname: this.userInfo.Lastname,
			});
		}
	}


	




}