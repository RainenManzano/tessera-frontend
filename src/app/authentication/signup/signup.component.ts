import { Component, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { forkJoin, Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfigurationService } from './../../services/configuration.service';
import { UserService } from './../../services/user.service';
import { DepartmentService } from './../../services/department.service';
import { PositionService } from './../../services/position.service';

import { Configuration } from './../../models/configuration.model';
import { Position } from './../../models/position.model';
import { Department } from './../../models/department.model';

import { ImagesLocation } from './../../system/locations';

@Component({
	selector: "app-registration",
	styleUrls: ["./signup.component.css"],
	templateUrl: "./signup.component.html"
})

export class SignUpComponent implements OnInit {

	userForm: FormGroup;
	registerType: Configuration;
	positions: Position[];
	departments: Department[];
	selectedDept: number;
	location: string;
	file: any = {
		lastModified: 1388806105000,
		name: 'tessera.jpg',
		size: 128502,
		type: 'image/jpeg'
	}

	constructor(private router: Router,
				private _snackBar: MatSnackBar,
				private configurationService: ConfigurationService,
				private userService: UserService,
				private departmentService: DepartmentService,
				private positionService: PositionService) {}

	ngOnInit() {
		this.location = ImagesLocation;
		this.userForm = new FormGroup({
			'idForm': new FormGroup({
				'empId': new FormControl(null, Validators.required, this.empIdAlreadyExists.bind(this)),
				'email': new FormControl(null, [Validators.required, Validators.email], this.emailAlreadyExists.bind(this))
			}),
			'personalForm': new FormGroup({
				'lastname': new FormControl(null, Validators.required),
				'firstname': new FormControl(null, Validators.required),
				'middlename': new FormControl(null)
			}),
			'companyForm': new FormGroup({
				'department': new FormControl(null, Validators.required),
				'position': new FormControl(null, Validators.required)
			}),
			'credentialForm': new FormGroup({
				'username': new FormControl(null, Validators.required, this.usernameAlreadyExists.bind(this)),
				'password': new FormControl(null, Validators.required, this.isPasswordSame.bind(this)),
				'confirmPassword': new FormControl(null, Validators.required, this.isPasswordSame.bind(this)),
			})
		});
		forkJoin(
			this.departmentService.getAllDepartment(),
			this.positionService.getAllPosition()
		).subscribe(
			([departments,positions]:[Department[],Position[]]) => {
				this.departments = departments;
				this.positions = positions;
			}, error => console.log(error)
		);
	}

	onRegister() {
		if(this.userForm.valid) {
			const empId = this.userForm.value.idForm.empId;
			const email = this.userForm.value.idForm.email;
			const lastname = this.userForm.value.personalForm.lastname;
			const firstname = this.userForm.value.personalForm.firstname;
			const middlename = this.userForm.value.personalForm.middlename;
			const department = this.userForm.value.companyForm.department;
			const position = this.userForm.value.companyForm.position;
			const username = this.userForm.value.credentialForm.username;
			const password = this.userForm.value.credentialForm.password;
			this.configurationService.getSingleConfigurationByName("registerType").subscribe(
				(configuration: Configuration) => {
					this.registerType = configuration[0];
					const promise = this.checkRegisterType();
					promise.then(
						() => {
							this.userService.insertUser(empId,email,lastname, firstname, middlename,department, position, username, password, this.registerType.Value, this.file, this.file.lastModified).subscribe(
								() => {
									this._snackBar.open("Registered Successfully", "Dismiss", {
								      duration: 5000,
								      horizontalPosition: 'right'
								    });
									this.router.navigate(["login"]);
								},
								error => console.log(error)
							);
						}
					).catch(
						() => {
							this._snackBar.open("User registration failed, please provide registration type", "Dismiss", {
								duration: 5000,
								horizontalPosition: 'right'
							});
							this.router.navigate(["login"]);
						}
					);
				}, error => console.log(error)
			);
		}
		
	}

	checkRegisterType(): Promise<any> {
		const promise = new Promise(
			(resolve, reject) => {
				if(typeof this.registerType === 'undefined' || this.registerType.Value=="" ) {
					reject();
				} 
				resolve();
			}
		)
		return promise;
	}

	onDepartmentChange() {
		this.selectedDept = this.userForm.value.companyForm.department;
	}

	empIdAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
		const id = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this.userService.doesEmployeeIdExists(id).subscribe((data: boolean) => {
				if(data == true) {
					this.userForm.get("idForm.empId").setErrors({idExists: true});
				} else {
					this.userForm.get("idForm.empId").setErrors(null);
				}
			})
		})
		return promise;
	}

	emailAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
		const email = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this.userService.doesEmailExists(email).subscribe((data: boolean) => {
				if(data == true) {
					this.userForm.get("idForm.email").setErrors({emailExists: true});
				} else {
					this.userForm.get("idForm.email").setErrors(null);
				}
			})
		})
		return promise;
	}

	usernameAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
		const username = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this.userService.doesUsernameExists(username).subscribe((data: boolean) => {
				if(data == true) {
					this.userForm.get("credentialForm.username").setErrors({usernameExists: true});
				} else {
					this.userForm.get("credentialForm.username").setErrors(null);
				}
			})
		})
		return promise;
	}

	isPasswordSame(control:FormControl): Promise<any>|Observable<any> {
		const password = this.userForm.get("credentialForm.password").value;
		const confirmPassword = this.userForm.get("credentialForm.confirmPassword").value;
		const promise = new Promise<any>((resolve, reject) => {
			if(password==confirmPassword) {
				this.userForm.get("credentialForm.confirmPassword").setErrors(null);
				this.userForm.get("credentialForm.password").setErrors(null);
			} else {
				this.userForm.get("credentialForm.confirmPassword").setErrors({confirmPassword: true});
			}
		})
		return promise;
	}

	onFileChange(fileElement) {
		this.file = fileElement.target.files[0];
	}


}