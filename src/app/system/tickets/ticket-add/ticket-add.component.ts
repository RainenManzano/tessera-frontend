import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { TicketService } from './../../../services/ticket.service';
import { IssueService } from './../../../services/issue.service';
import { CategoryService } from './../../../services/category.service';

import { Category } from './../../../models/category.model';
import { Issue } from './../../../models/issue.model';

@Component({
  selector: 'ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['ticket-add.component.css']
})

export class TicketAddComponent implements OnInit{
	ticketForm: FormGroup;
	issueCategory: number;
	category: number;
	priority: number;
	categories: Category[];
	issues: Issue[];

	constructor(private ticketService: TicketService,
				private _categoryService: CategoryService,
				private _issueService: IssueService,
				public dialogRef: MatDialogRef<TicketAddComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {

		this.ticketForm = new FormGroup({
			'issue': new FormControl(null, Validators.required),
			'description': new FormControl('')
		});

		forkJoin(
			this._categoryService.getAllCategory(),
			this._issueService.getAllIssue()
		).subscribe(
			([categories, issues]: [Category[], Issue[]]) => {
				this.categories = categories;
				this.issues = issues;
			}, error => console.log(error)
		);

	}

	onAddTicket() {
		if(this.ticketForm.valid) {
			let issue = this.ticketForm.value.issue;
			let description = this.ticketForm.value.description;
			this.ticketService.insertTicket(issue, description, this.issueCategory, this.priority).subscribe((data) => {
				this.ticketService.notification.next();
				this.cancel();
			}, error => console.log(error));
		}
	}

	cancel(): void {
		this.dialogRef.close();
	}

	onSelectCategory(event) {
		this.category = event.value
	}

	onSelectIssue(issue) {
		this.issueCategory = issue.Category_Id;
		this.priority = issue.Level;
	}

}