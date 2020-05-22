import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { PositionService } from './../../../../services/position.service';
import { Position } from './../../../../models/position.model';

@Component({
  selector: 'position-view',
  templateUrl: './position-view.component.html',
  styleUrls: ['position-view.component.css']
})

export class PositionViewComponent implements OnInit, OnDestroy{
	refresh: Subscription;
	positionInfo: Position;
	positionId: number;

	constructor(private positionService: PositionService,
					private route: ActivatedRoute,
					private router: Router) {}

	ngOnInit() {
		const refreshInterval = interval(5000);
		this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
			this.positionService.getSpecificPosition(this.positionId).subscribe((data: Position) => {
				this.positionInfo = data[0];
			}, error => console.log(error));
		})
		this.route.params.subscribe((params: Params) => {
			this.positionId = +params["id"]
			this.positionService.getSpecificPosition(this.positionId).subscribe((data: Position) => {
				this.positionInfo = data[0];
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
		this.positionService.deletePosition(this.positionId).subscribe(() => {
			this.positionService.notification.next();
			this.router.navigate(['../'], {relativeTo: this.route});
		});
	}





}