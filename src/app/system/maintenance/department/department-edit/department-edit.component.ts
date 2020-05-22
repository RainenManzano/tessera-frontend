import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DepartmentService } from './../../../../services/department.service';

import { Department } from './../../../../models/department.model';

@Component({
  selector: 'department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['department-edit.component.css']
})

export class DepartmentEditComponent implements OnInit{

	department: Department;
	departmentId: number;
	departmentForm: FormGroup;

	constructor(private departmentService: DepartmentService,
				private route: ActivatedRoute,
				private router: Router) {}

	ngOnInit() {

		this.departmentForm = new FormGroup({
			'departmentName': new FormControl(null, Validators.required),
			'departmentDescription': new FormControl(null)
		});

		this.route.params.subscribe(
			(params: Params) => {
				this.departmentId = +params["id"];
				this.departmentService.getSpecificDepartment(this.departmentId).subscribe(
					(department: Department) => {
						this.department = department[0];
						this.departmentForm.setValue({
							'departmentName': this.department.Name,
							'departmentDescription': this.department.Description
						});
					}
				);
			}
		);

	}

	onSubmit() {
		if(this.departmentForm.status!="INVALID") {
			this.departmentService.updateDepartment(this.departmentForm.value.departmentName, this.departmentForm.value.departmentDescription, this.departmentId).subscribe(
					() => {
						this.router.navigate(['../'], {relativeTo: this.route});
						this.departmentService.notification.next();
					},
					error => console.log(error)
			);
		}
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}


}