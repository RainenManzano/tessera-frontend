import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { IssueService } from './../../../../services/issue.service';
import { CategoryService } from './../../../../services/category.service';
import { PriorityService } from './../../../../services/priority.service';

import { Issue } from './../../../../models/issue.model';
import { Category } from './../../../../models/category.model';
import { Priority } from './../../../../models/priority.model';

@Component({
  selector: 'issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['issue-edit.component.css']
})

export class IssueEditComponent implements OnInit{

	issue: Issue;
	issueId: number;
	issueForm: FormGroup;
	categories: Category[];
	priorities: Priority[];

	constructor(private issueService: IssueService,
				private _categoryService: CategoryService,
				private _priorityService: PriorityService,
				private route: ActivatedRoute,
				private router: Router) {}

	ngOnInit() {
		this.issueId = this.route.snapshot.params["id"]
		this.issueForm = new FormGroup({
			'category': new FormControl(null, Validators.required),
			'priority': new FormControl(null, Validators.required),
			'issue': new FormControl(null, Validators.required),
			'description': new FormControl(null)
		});

		forkJoin(
			this._categoryService.getAllCategory(),
			this._priorityService.getAllPriority(),
			this.issueService.getSpecificIssue(this.issueId)
		).subscribe(
			([categories, priorities, issue]: [Category[], Priority[], Issue]) => {
				this.categories = categories;
				this.priorities = priorities;
				this.issue = issue[0];
				this.issueForm.setValue({
					'category': this.issue.Category_Id,
					'priority': this.issue.Priority_Id,
					'issue': this.issue.Issue,
					'description': this.issue.Description
				});
			}
		);

	}

	onSubmit() {
		if(this.issueForm.status!="INVALID") {
			this.issueService.updateIssue(this.issueForm.value, this.issueId).subscribe(
					() => {
						this.router.navigate(['../'], {relativeTo: this.route});
						this.issueService.notification.next();
					},
					error => console.log(error)
			);
		}
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}


}