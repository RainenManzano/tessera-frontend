import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { IssueService } from './../../../../services/issue.service';
import { CategoryService } from './../../../../services/category.service';
import { PriorityService } from './../../../../services/priority.service';

import { Category } from './../../../../models/category.model';
import { Priority } from './../../../../models/priority.model';

@Component({
  selector: 'issue-add',
  templateUrl: './issue-add.component.html',
  styleUrls: ['issue-add.component.css']
})

export class IssueAddComponent implements OnInit{

	issueForm: FormGroup;
	categories: Category[];
	priorities: Priority[];

	constructor(private _issueService: IssueService,
				private _categoryService: CategoryService,
				private _priorityService: PriorityService,
				public dialogRef: MatDialogRef<IssueAddComponent>,
    			@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {

		this.issueForm = new FormGroup({
			"category": new FormControl(null, Validators.required),
			"priority": new FormControl(null, Validators.required),
			"issue": new FormControl(null, Validators.required),
			"description": new FormControl(' ')
		});

		forkJoin(
			this._categoryService.getAllCategory(),
			this._priorityService.getAllPriority()
		).subscribe(
			([categories, priorities]: [Category[], Priority[]]) => {
				this.categories = categories;
				this.priorities = priorities;
			}
		);

	}

	onAddIssue() {
		if(this.issueForm.valid) {
			this._issueService.insertIssue(this.issueForm.value).subscribe(
				(data) => {
					console.log(data);
					this.cancel();
					this._issueService.notification.next();
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}

	cancel(): void {
		this.dialogRef.close();
		this.issueForm.reset();
	}


}