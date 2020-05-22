import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { IssueService } from './../../../../services/issue.service';
import { Issue } from './../../../../models/issue.model';

@Component({
  selector: 'issue-view',
  templateUrl: './issue-view.component.html',
  styleUrls: ['issue-view.component.css']
})

export class IssueViewComponent implements OnInit, OnDestroy {
	refresh: Subscription;
	issueInfo: Issue;
	issueId: number;

	constructor(private _issueService: IssueService,
					private router: Router,
					private route: ActivatedRoute) {}

	ngOnInit() {
		const refreshInterval = interval(5000);
		this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
			this._issueService.getSpecificIssue(this.issueId).subscribe((data: Issue) => {
				this.issueInfo = data[0];
			}, error => console.log(error));
		});
		this.route.params.subscribe((params: Params) => {
			this.issueId = +params["id"];
			this._issueService.getSpecificIssue(this.issueId).subscribe((data: Issue) => {
				this.issueInfo = data[0];
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
		this._issueService.deleteIssue(this.issueId).subscribe(
			() => {
				this._issueService.notification.next();
				this.router.navigate(['../'], {relativeTo: this.route});
			}
		);
	}






}