import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { PriorityService } from './../../../../services/priority.service';

@Component({
  selector: 'priority-add',
  templateUrl: './priority-add.component.html',
  styleUrls: ['priority-add.component.css']
})

export class PriorityAddComponent implements OnInit{
	priorityForm: FormGroup;

	constructor(private priorityService: PriorityService,
				public dialogRef: MatDialogRef<PriorityAddComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {
		this.priorityForm = new FormGroup({
			'label': new FormControl(null, Validators.required, this.labelAlreadyExists.bind(this)),
			'level': new FormControl(null, Validators.required, this.levelAlreadyExists.bind(this)),
			'days': new FormControl(0, Validators.required),
			'hours': new FormControl(0, Validators.required),
			'minutes': new FormControl(0, Validators.required)
		});
	}

	onAddPriority() {
		if(this.priorityForm.valid) {
			let level: number = this.priorityForm.value.level;
			let label: string = this.priorityForm.value.label;
			let days: number = this.priorityForm.value.days;
			let hours: number = this.priorityForm.value.hours;
			let minutes: number = this.priorityForm.value.minutes;
			this.priorityService.insertPriority(level, days, hours, minutes, label).subscribe(
				(data) => {
					this.priorityService.notification.next();
					this.cancel();
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}

	cancel(): void {
		this.dialogRef.close();
		this.priorityForm.reset();
	}

	levelAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
		const level: number = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this.priorityService.doesLevelExists(level, 0).subscribe((data: boolean) => {
				if(data == true) {
					this.priorityForm.get("level").setErrors({levelExists: true});
				} else {
					this.priorityForm.get("level").setErrors(null);
				}
			})
		})
		return promise;
	}

	labelAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
		const label: string = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this.priorityService.doesLabelExists(label, 0).subscribe((data: boolean) => {
				if(data == true) {
					this.priorityForm.get("label").setErrors({labelExists: true});
				} else {
					this.priorityForm.get("label").setErrors(null);
				}
			})
		})
		return promise;
	}


}