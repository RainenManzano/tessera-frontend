import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { UserService } from './../../../services/user.service';
import { DepartmentService } from './../../../services/department.service';
import { PositionService } from './../../../services/position.service';

import { User } from './../../../models/user.model';
import { Department } from './../../../models/department.model';
import { Position } from './../../../models/position.model';

@Component({
  selector: 'users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['users-edit.component.css']
})

export class UsersEditComponent implements OnInit{

	user: User;
	userId: number;
	userForm: FormGroup;
	departments: Department[];
	selectedDepartment: number;
	positions: Position[];

	constructor(private userService: UserService,
					private departmentService: DepartmentService,
					private positionService: PositionService,
					private route: ActivatedRoute,
					private router: Router) {}

	ngOnInit() {

		this.userForm = new FormGroup({
			'empId': new FormControl(null, Validators.required),
			'lastname': new FormControl(null, Validators.required),
			'firstname': new FormControl(null, Validators.required),
			'middlename': new FormControl(null),
			'email': new FormControl(null, Validators.required),
			'department': new FormControl(null, Validators.required),
			'position': new FormControl(null, Validators.required),
			'role': new FormControl(null, Validators.required),
			'username': new FormControl(null, Validators.required),
			'status': new FormControl(null),
		});

		this.userId = this.route.snapshot.params["id"];

		forkJoin(
			this.departmentService.getAllDepartment(),
			this.positionService.getAllPosition(),
			this.userService.getSingleUserById(this.userId)
		).subscribe(
			([departments, positions, user]: [Department[], Position[], User]) => {
				// console.log(user);
				let status: number = +user[0].Status
				this.departments = departments;
				this.positions = positions;
				this.user = user[0];
				this.selectedDepartment = this.user.Department_Id;
				this.userForm.setValue({
					'empId': this.user.Employee_Id,
					'lastname': this.user.Lastname,
					'firstname': this.user.Firstname,
					'middlename': this.user.Middlename,
					'email': this.user.Company_Email,
					'department': this.user.Department_Id,
					'position': this.user.Position_Id,
					'role': this.user.Role,
					'username': this.user.Username,
					'status': status
				});
			},
			error => console.log(error)
		);

	}

	onSubmit() {
		if(this.userForm.valid) {
			let employeeId = this.userForm.value.empId;
			let email = this.userForm.value.email;
			let lastname = this.userForm.value.lastname;
			let firstname = this.userForm.value.firstname;
			let middlename = this.userForm.value.middlename;
			let department = this.userForm.value.department;
			let position = this.userForm.value.position;
			let role = this.userForm.value.role;
			let username = this.userForm.value.username;
			let status = this.userForm.value.status;
			this.userService.updateUser(employeeId, email, lastname, firstname, middlename, department, position, role, username, status, this.userId).subscribe(
					() => {
						this.router.navigate(['../'], {relativeTo: this.route});
						this.userService.notification.next();
					},
					error => console.log(error)
			);
		}
	}

	onSelectDepartment(departmentId) {
		this.selectedDepartment = departmentId;
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}


}