import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DepartmentService } from './../../../../services/department.service';

@Component({
  selector: 'department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['department-add.component.css']
})

export class DepartmentAddComponent implements OnInit{

	departmentForm: FormGroup;	

	constructor(private departmentService: DepartmentService,
				public dialogRef: MatDialogRef<DepartmentAddComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {
		this.departmentForm = new FormGroup({
			'name': new FormControl('', Validators.required, this.departmentAlreadyExists.bind(this)),
			'description': new FormControl('')
		});
	}

	onAddDepartment() {
		if(this.departmentForm.valid) {
			this.departmentService.insertDepartment(this.departmentForm.value.name, this.departmentForm.value.description).subscribe(
				(data) => {
					this.cancel();
					this.departmentService.notification.next();
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}

	cancel(): void {
		this.dialogRef.close();
		this.departmentForm.reset();
	}

	departmentAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
		const department = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this.departmentService.doesDepartmentExists(department).subscribe((data: boolean) => {
				console.log(data)
				if(data == true) {
					this.departmentForm.get("name").setErrors({departmentExists: true});
				} else {
					this.departmentForm.get("name").setErrors(null);
				}
			})
		})
		return promise;
	}

}