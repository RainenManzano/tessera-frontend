import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { PriorityService } from './../../../../services/priority.service';
import { Priority } from './../../../../models/priority.model';

@Component({
  selector: 'priority-view',
  templateUrl: './priority-view.component.html',
  styleUrls: ['priority-view.component.css']
})

export class PriorityViewComponent implements OnInit, OnDestroy{
	refresh: Subscription;
	priorityInfo: Priority;
	priorityId: number;

	constructor(private priorityService: PriorityService,
					private router: Router,
					private route: ActivatedRoute) {}

	ngOnInit() {
		const refreshInterval = interval(5000);
		this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
			this.priorityService.getSpecificPriority(this.priorityId).subscribe((data: Priority) => {
				this.priorityInfo = data[0];
			}, error => console.log(error));
		});
		this.route.params.subscribe((params: Params) => {
			this.priorityId = +params["id"];
			this.priorityService.getSpecificPriority(this.priorityId).subscribe((data: Priority) => {
				this.priorityInfo = data[0];
			}, error => console.log(error));
		});
	}

	ngOnDestroy() {
		this.refresh.unsubscribe();
	}

	onEdit() {
		this.router.navigate(['edit'], {relativeTo: this.route});
	}

	onDelete() {
		this.priorityService.deletePriority(this.priorityId).subscribe(() => {
			this.priorityService.notification.next();
			this.router.navigate(['../'], {relativeTo: this.route});
		});
	}

	convertDuration(days, hours, minutes) {
		return this.priorityService.convertDuration(days, hours, minutes);
	}

}