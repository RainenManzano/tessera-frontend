import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { UserService } from './../../services/user.service';
import { TicketService } from './../../services/ticket.service';
import { AuthenticationService } from './../../services/authentication.service';
import { IssueService } from './../../services/issue.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	users: number = 0;
	employees: number = 0;
	supports: number = 0;
	head: number = 0;
	role: number;
	totalTickets: number = 0;
	supportedTickets: number = 0;
	issuedTickets: number = 0;
	topIssues: any;
	recentTickets: any;

	constructor(private _ticketService: TicketService,
					private _userService: UserService,
					private _authenticationService: AuthenticationService,
					private _issueService: IssueService) { }

	ngOnInit() {
		forkJoin(
			this._authenticationService.getRole(),
			this._userService.getAllUser(),
			this._ticketService.getTotalTickets('today', "All"),
			this._ticketService.getTotalTickets('today', "Supported"),
			this._ticketService.getTotalTickets('today', "Issued"),
			this._ticketService.getIssuedSupportedRecentTickets(),
			this._issueService.getTopIssues()
		).subscribe(
			([role, users, allTickets, supportedTickets, issuedTickets, recentTickets, issues]) => {
				//Role
				this.role = +role;
				// Users
				this.users = users.length;
				// Employees
				this.employees = this._userService.countUsersByRole(users, "Employee");
				// Support
				this.supports = this._userService.countUsersByRole(users, "Support");
				// Head
				this.head = this._userService.countUsersByRole(users, "Head");
				//All Tickets
				let results = this._ticketService.countTicketStatus(allTickets)
				this._ticketService.dashboardAllTickets.next(results);
				this.totalTickets = results.Open + results.Closed + results.Pending + results.Assigned + results.Resolved;
				//Supported Tickets
				results = this._ticketService.countTicketStatus(supportedTickets)
				this._ticketService.dashboardSupportedTickets.next(results);
				this.supportedTickets = results.Open + results.Closed + results.Pending + results.Assigned + results.Resolved;
				//Issued Tickets
				results = this._ticketService.countTicketStatus(issuedTickets)
				this._ticketService.dashboardIssuedTickets.next(results);
				this.issuedTickets = results.Open + results.Closed + results.Pending + results.Assigned + results.Resolved;
				//Departments
				results = this._ticketService.countDepartmentTickets(allTickets);
				this._ticketService.dashboardDepartmentTickets.next(results);
				//Recent Tickets
				// console.log(recentTickets);
				this.recentTickets = recentTickets;
				//Issues
				this.topIssues = issues;
			}, error => console.log(error)
		);

		this._ticketService.dashboardDate.subscribe(
			(value: string) => {
				forkJoin(
					this._ticketService.getTotalTickets(value, "All"),
					this._ticketService.getTotalTickets(value, "Supported"),
					this._ticketService.getTotalTickets(value, "Issued")
				).subscribe(
					([allTickets, supportedTickets, issuedTickets]) => {
						//All Tickets
						let results = this._ticketService.countTicketStatus(allTickets)
						this._ticketService.dashboardAllTickets.next(results);
						this.totalTickets = results.Open + results.Closed + results.Pending + results.Assigned + results.Resolved;
						//Supported Tickets
						results = this._ticketService.countTicketStatus(supportedTickets)
						this._ticketService.dashboardSupportedTickets.next(results);
						this.supportedTickets = results.Open + results.Closed + results.Pending + results.Assigned + results.Resolved;
						//Supported Tickets
						results = this._ticketService.countTicketStatus(issuedTickets)
						this._ticketService.dashboardIssuedTickets.next(results);
						this.issuedTickets = results.Open + results.Closed + results.Pending + results.Assigned + results.Resolved;
						//Departments
						results = this._ticketService.countDepartmentTickets(allTickets);
						this._ticketService.dashboardDepartmentTickets.next(results);
						
					}, error => console.log(error)
				);
			}, error => console.log(error)
		);
	}

	onDateChange(value: string) {
		this._ticketService.dashboardDate.next(value);
	}

}
