import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { DepartmentService } from './../../../../services/department.service';

import { Department } from './../../../../models/department.model';

@Component({
  selector: 'department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['department-view.component.css']
})

export class DepartmentViewComponent implements OnInit, OnDestroy{
	refresh: Subscription;
	department: Department;
	departmentId: number

	constructor(private departmentService: DepartmentService,
				private route: ActivatedRoute,
				private router: Router) {}

	ngOnInit() {
		const refreshInterval = interval(5000);
		this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
			this.departmentService.getSpecificDepartment(this.departmentId).subscribe((data: Department) => {
				this.department = data[0];
			},	error => console.log(error));
		});
		this.route.params.subscribe((params: Params) => {
			this.departmentId = +params['id'];
			this.departmentService.getSpecificDepartment(this.departmentId).subscribe((data: Department) => {
				this.department = data[0];
			},	error => console.log(error));
		});
	}

	ngOnDestroy() {
		this.refresh.unsubscribe();
	}

	onEdit() {
		this.router.navigate(['edit'], {relativeTo: this.route});
	}

	onDelete() {
		this.departmentService.deleteDepartment(this.departmentId).subscribe(() => {
			this.departmentService.notification.next();
			this.router.navigate(['../'], {relativeTo: this.route});
		});
	}





}