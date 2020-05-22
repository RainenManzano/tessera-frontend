import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { PriorityService } from './../../../../services/priority.service';

import { Priority } from './../../../../models/Priority.model';

@Component({
  selector: 'priority-edit',
  templateUrl: './priority-edit.component.html',
  styleUrls: ['priority-edit.component.css']
})

export class PriorityEditComponent implements OnInit{

	priority: Priority;
	priorityId: number;
	priorityForm: FormGroup;

	constructor(private priorityService: PriorityService,
				private route: ActivatedRoute,
				private router: Router) {}

	ngOnInit() {

		this.priorityForm = new FormGroup({
			'level': new FormControl(null, Validators.required, this.levelAlreadyExists.bind(this)),
			'label': new FormControl(null, Validators.required, this.labelAlreadyExists.bind(this)),
			'days': new FormControl(0),
			'hours': new FormControl(0, Validators.required),
			'minutes': new FormControl(0, Validators.required)
		});

		this.route.params.subscribe(
			(params: Params) => {
				this.priorityId = +params["id"];
				this.priorityService.getSpecificPriority(this.priorityId).subscribe(
					(priority: Priority) => {
						this.priority = priority[0];
						this.priorityForm.setValue({
							'level': this.priority.Level,
							'label': this.priority.Label,
							'days': this.priority.Days,
							'hours': this.priority.Hours,
							'minutes': this.priority.Minutes
						});
					}, error => console.log(error)
				);
			}
		);

	}

	onSubmit() {
		if(this.priorityForm.valid) {
			let level: number = this.priorityForm.value.level;
			let label: string = this.priorityForm.value.label;
			let days: number = this.priorityForm.value.days;
			let hours: number = this.priorityForm.value.hours;
			let minutes: number = this.priorityForm.value.minutes;
			this.priorityService.updatePriority(level, days, hours, minutes, label, this.priorityId).subscribe(
					() => {
						this.router.navigate(['../'], {relativeTo: this.route});
						this.priorityService.notification.next();
					},
					error => console.log(error)
			);
		}
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}

	levelAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
		const level: number = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this.priorityService.doesLevelExists(level, this.priorityId).subscribe((data: boolean) => {
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
			this.priorityService.doesLabelExists(label, this.priorityId).subscribe((data: boolean) => {
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