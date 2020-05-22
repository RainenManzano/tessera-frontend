import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { PositionService } from './../../../../services/position.service';
import { DepartmentService } from './../../../../services/department.service';

import { Department } from './../../../../models/department.model';

@Component({
  selector: 'position-add',
  templateUrl: './position-add.component.html',
  styleUrls: ['position-add.component.css']
})

export class PositionAddComponent implements OnInit{

	positionForm: FormGroup;
	departments: Department[];

	constructor(private positionService: PositionService,
				private departmentService: DepartmentService,
				public dialogRef: MatDialogRef<PositionAddComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {

		this.positionForm = new FormGroup({
			"name": new FormControl(null, Validators.required, this.positionAlreadyExists.bind(this)),
			"desc": new FormControl(null),
			"department": new FormControl(null, Validators.required)
		});

		this.departmentService.getAllDepartment().subscribe(
			(departments: Department[]) => {
				this.departments = departments;
			},
			error => console.log(error)
		);

	}

	onAddPosition() {
		const name: string = this.positionForm.value.name;
		const desc: string = this.positionForm.value.desc;
		const department: number = this.positionForm.value.department;
		if(this.positionForm.valid) {
			this.positionService.insertPosition(name, desc, department).subscribe(
				(data) => {
					console.log(data);
					this.cancel();
					this.positionService.notification.next();
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}

	cancel(): void {
		this.dialogRef.close();
		this.positionForm.reset();
	}

	positionAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
		const position = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this.positionService.doesPositionExists(position).subscribe((data: boolean) => {
				if(data == true) {
					this.positionForm.get("name").setErrors({positionExists: true});
				} else {
					this.positionForm.get("name").setErrors(null);
				}
			})
		})
		return promise;
	}

}