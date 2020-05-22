import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { PositionService } from './../../../../services/position.service';
import { DepartmentService } from './../../../../services/department.service';

import { Position } from './../../../../models/position.model';
import { Department } from './../../../../models/department.model';

@Component({
  selector: 'position-edit',
  templateUrl: './position-edit.component.html',
  styleUrls: ['position-edit.component.css']
})

export class PositionEditComponent implements OnInit{

	position: Position;
	positionId: number;
	departments: Department[];
	positionForm: FormGroup;

	constructor(private positionService: PositionService,
				private departmentService: DepartmentService,
				private route: ActivatedRoute,
				private router: Router) {}

	ngOnInit() {

		this.positionForm = new FormGroup({
			'name': new FormControl(null, Validators.required),
			'description': new FormControl(null),
			'department': new FormControl(null, Validators.required)
		});

		this.positionId = +this.route.snapshot.params["id"];

		forkJoin(
			this.positionService.getSpecificPosition(this.positionId),
			this.departmentService.getAllDepartment()
		).subscribe(	
			( [position, departments]: [Position, Department[]] ) => {
				this.departments = departments;
				this.position = position[0];
				this.positionForm.setValue({
					'name': this.position.Position_Name,
					'description': this.position.Position_Desc,
					'department': this.position.Department_Id
				});
			},
			error => console.log(error)
		);


	}

	onSubmit() {
		if(this.positionForm.valid) {
			this.positionService.updatePosition(this.positionForm.value.name, this.positionForm.value.description, this.positionForm.value.department, this.positionId).subscribe(
					() => {
						this.router.navigate(['../'], {relativeTo: this.route});
						this.positionService.notification.next();
					},
					error => console.log(error)
			);
		}
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}


}