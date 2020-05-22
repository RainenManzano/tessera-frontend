import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { TicketService } from './../../../services/ticket.service';
import { CategoryService } from './../../../services/category.service';
import { IssueService } from './../../../services/issue.service';
import { UserService } from './../../../services/user.service';

import { Ticket } from './../../../models/ticket.model';
import { Category } from './../../../models/category.model';
import { Issue } from './../../../models/issue.model';
import { User } from './../../../models/user.model';

@Component({
  selector: 'ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['ticket-edit.component.css']
})

export class TicketEditComponent implements OnInit{

	ticket: Ticket;
	ticketId: number;
	ticketForm: FormGroup;

	categories: Category[];
	issues: Issue[];
	usersSupport: User[];
	users: User[];
	selectedCategory: number;
	time = {hour: 13, minute: 30};

	isTicketClosed: boolean = false;

	constructor(private ticketService: TicketService,
				private categoryService: CategoryService,
				private _issueService: IssueService,
				private userService: UserService,
				private route: ActivatedRoute,
				private router: Router) {}

	ngOnInit() {

		this.ticketId = this.route.snapshot.params["id"];

		this.ticketForm = new FormGroup({
			'issue': new FormControl(null, Validators.required),
			'description': new FormControl(null),
			'solution': new FormControl('', Validators.required),
			'createdBy': new FormControl(null),
			'supportedBy': new FormControl(''),
			'dateCreated': new FormControl({value: null, disabled: false}),
			'timeCreated': new FormControl(null),
			'timeClosed': new FormControl(null),
			'dateClosed': new FormControl({value: null, disabled: false}, Validators.required),
			'status': new FormControl(null),
		});

		forkJoin(
			this.ticketService.getSingleTicket(this.ticketId),
			this.categoryService.getAllCategory(),
			this._issueService.getAllIssue(),
			this.userService.getUsersSupport(),
			this.userService.getAllUser()
		).subscribe(
			([ticket, categories, issues, usersSupport, users ]: [ Ticket, Category[], Issue[],  User[], User[] ]) => {
				this.categories = categories;
				this.issues = issues;
				this.usersSupport = usersSupport;
				this.users = users;
				this.ticket = ticket[0];
				this.isTicketClosed = this.ticket.Status=="Closed"? true: false;

				let timeCreated = {
					hour: +this.ticket.HourCreated,
					minute: +this.ticket.MinuteCreated
				}
				let hourClosed = this.ticket.HourClosed != "" ? +this.ticket.HourClosed: "";
				let minuteClosed = this.ticket.MinuteClosed != "" ? +this.ticket.MinuteClosed: "";
				let timeClosed = {
					hour: hourClosed,
					minute: minuteClosed
				}
				let dateClosed = this.ticket.DateClosed!=null ? new Date(this.ticket.DateClosed): new Date("00/00/0000");
				this.ticketForm.setValue({
					'issue': this.ticket.Issue,
					'description': this.ticket.Description,
					'solution': this.ticket.Solution,
					'createdBy': this.ticket.CreatedBy,
					'supportedBy': this.ticket.SupportedBy,
					'dateCreated': new Date(this.ticket.DateCreated),
					'timeCreated': timeCreated,
					'timeClosed': timeClosed,
					'dateClosed': dateClosed,
					'status': this.ticket.Status,
				});
			}, error => console.log(error)
		);

	}

	onSubmit() { 
		if(this.ticketForm.get("status").value=="Closed") {
			if(this.ticketForm.get("dateClosed").value=="Invalid Date") {
				this.ticketForm.get("dateClosed").setErrors({"required": true})
			}
		}
		if(this.ticketForm.valid) {
			this.ticketService.updateTicket(this.ticketId, this.ticketForm.value).subscribe(
					() => {
						this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
						this.ticketService.notification.next();
					}, error => console.log(error)
			);
		}
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
	}

	onSelectCategory(category) {
		this.selectedCategory = category.value;
	}

	onTicketStatusChanged(status) {
		if(status.value!="Closed") {
			this.ticketForm.get("solution").setErrors(null);
			this.ticketForm.get("dateClosed").setErrors(null);
		}
		this.isTicketClosed = status.value=="Closed"? true: false;
	}


}