import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { UserService } from './../../../services/user.service';
import { DepartmentService } from './../../../services/department.service';
import { PositionService } from './../../../services/position.service';

import { Position } from './../../../models/position.model';
import { Department } from './../../../models/department.model';

import { PipesModule } from './../../../pipes/pipes.module';

@Component({
  selector: 'users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['users-add.component.css']
})

export class UsersAddComponent implements OnInit{
	userForm: FormGroup;
	positions: Position[];
	departments: Department[];
	isSupport: number = 0;
	selectedDept: number;
	file: any = {
		lastModified: 1388806105000,
		name: 'tessera.jpg',
		size: 128502,
		type: 'image/jpeg'
	}

	constructor(private userService: UserService,
				private departmentService: DepartmentService,
				private positionService: PositionService,
				public dialogRef: MatDialogRef<UsersAddComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {

		this.userForm = new FormGroup({
			'idForm': new FormGroup({
				'empId': new FormControl(null, [Validators.required], this.empIdExists.bind(this)),
				'companyEmail': new FormControl(null, [Validators.required, Validators.email], this.emailExists.bind(this))
			}),
			'personalForm': new FormGroup({
				'lastname': new FormControl(null, Validators.required),
				'firstname': new FormControl(null, Validators.required),
				'middlename': new FormControl(null),
			}),
			'companyForm': new FormGroup({
				'department': new FormControl(null, Validators.required),
				'position': new FormControl(null, Validators.required)
			}),
			'userType': new FormGroup({
				'role': new FormControl(null, Validators.required),
			})
		});

		forkJoin(
			this.departmentService.getAllDepartment(),
			this.positionService.getAllPosition(),
		).subscribe(
			( [departments, positions]: [Department[], Position[]] ) => {
				this.departments = departments;
				this.positions = positions;
			},
			error => console.log(error)
		);

	}

	onAddUser() {
		if(this.userForm.valid) {
			let empId: number = this.userForm.value.idForm.empId;
			let Lastname: string = this.userForm.value.personalForm.lastname;
			let Firstname: string = this.userForm.value.personalForm.firstname;
			let Middlename: string = this.userForm.value.personalForm.middlename;
			let department: number = this.userForm.value.companyForm.department;
			let position: number = this.userForm.value.companyForm.position;
			let role: number = this.userForm.value.userType.role;
			let email: string = this.userForm.value.idForm.companyEmail;
			let username: string = this.userForm.value.idForm.companyEmail;
			let password: string = this.userForm.value.personalForm.firstname + this.userForm.value.personalForm.lastname;
			this.userService.insertUser(empId, email, Lastname, Firstname, Middlename, department, position, username, password, role, this.file, this.file.lastModified).subscribe(
					() => {
						this.userService.notification.next();
						this.cancel();
					}, error => console.log(error)
				);
		}
	}

	cancel(): void {
		this.dialogRef.close();
		this.userForm.reset();
	}

	onChangeDepartment() {
		this.selectedDept = this.userForm.value.companyForm.department;
	}

	empIdExists(control:FormControl): Promise<any> | Observable<any> {
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

	emailExists(control:FormControl): Promise<any> | Observable<any> {
		const email = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this.userService.doesEmailExists(email).subscribe((data: boolean) => {
				if(data == true) {
					this.userForm.get("idForm.companyEmail").setErrors({emailExists: true});
				} else {
					this.userForm.get("idForm.companyEmail").setErrors(null);
				}
			})
		})
		return promise;
	}



}