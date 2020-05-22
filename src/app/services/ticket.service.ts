import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Ticket } from './../models/ticket.model';
import { AuthenticationService } from './authentication.service';
import { ApiLocation } from './../system/locations';

@Injectable()
export class TicketService {
	private api: string;
	tickets:Ticket[];
	notification = new Subject();
	searchStringChanged = new Subject();
	// Dashboard
	dashboardDate = new Subject();
	dashboardAllTickets = new Subject();
	dashboardSupportedTickets = new Subject();
	dashboardIssuedTickets = new Subject();
	dashboardDepartmentTickets = new Subject();

	constructor(private http: HttpClient,
					private _authService: AuthenticationService) {
		this.api = ApiLocation + "transacTicket.php?action=";
	}

	getFilteredTickets(status: string, searchString: string) {
		let resultArray: Ticket[] = [];
		if(searchString=="") {
			if(status=="All") {
				resultArray = this.tickets.slice();
			}
			else if(status=="Requests") {
				for(const ticket of this.tickets) {
					if(ticket.Is_Reassign == 1) {
						resultArray.push(ticket);
					}
				}
			} else {
				for(const ticket of this.tickets.slice()) {
					if(ticket.Status == status) {
						resultArray.push(ticket);
					}
				}
			}
		} else {
			resultArray = this.searchFilteredTickets(searchString);
		}
		return resultArray;
	}

	searchFilteredTickets(searchString: string) {
		const resArray: Ticket[] = [];
		for(const ticket of this.tickets.slice()) {
			let ticketId: string = ticket.Ticket_Id.toString().toLowerCase();
			let issue: string = ticket.IssueName.toLowerCase();
			if(ticketId.search(searchString.toLowerCase()) != -1) {
				resArray.push(ticket);
			}else if(issue.search(searchString.toLowerCase()) != -1) {
				resArray.push(ticket);
			}
		}
		return resArray;
	}

	reloadTickets(ticketType: string) {
		let link: string = this.api.slice();
		if(ticketType=="view-all-tickets") {
			link = link + "getAllTickets"
			return this.http.get<Ticket[]>(link);
		} else if(ticketType=="view-issued-tickets") {
			link = link + "getIssuedTickets";
			let formData = new FormData();
			formData.append("Token", this._authService.getInLocalStorage('currentUser').token);
			return this.http.post<Ticket[]>(link, formData);
		} else if(ticketType=="view-supported-tickets") {
			link = link + "getSupportedTickets";
			let formData = new FormData();
			formData.append("Token", this._authService.getInLocalStorage('currentUser').token);
			return this.http.post<Ticket[]>(link, formData);
		}
	}

	getSingleTicket(ticketId) {
		let link: string = this.api.slice();
		link = link + "getSingleTicket";
		let formData = new FormData();
		formData.append("Ticket_Id", ticketId);
		return this.http.post<Ticket>(link, formData);
	}

	insertTicket(issue, description, categoryId, level) {
		let link: string = this.api.slice();
		link = link + "addTicket"
		let ticketInfo = new FormData();
		ticketInfo.append("Issue", issue);
		ticketInfo.append("Description", description);
		ticketInfo.append("Token", this._authService.getInLocalStorage('currentUser').token);
		ticketInfo.append("Category_Id", categoryId);
		ticketInfo.append("Level", level);
		return this.http.post(link, ticketInfo);
	}

	updateTicket(ticketId, ticketInfo) {
		let link: string = this.api.slice();
		link = link + "updateTicket";
		let dateClosed = ticketInfo.dateClosed!="Invalid Date"? ticketInfo.dateClosed.toLocaleDateString(): "";
		let formData = new FormData();
		formData.append("Ticket_Id", ticketId);
		formData.append("Issue", ticketInfo.issue);
		formData.append("Description", ticketInfo.description);
		formData.append("Solution", ticketInfo.solution);
		formData.append("CreatedBy", ticketInfo.createdBy);
		formData.append("SupportedBy", ticketInfo.supportedBy);
		formData.append("DateCreated", ticketInfo.dateCreated.toLocaleDateString());
		formData.append("HourCreated", ticketInfo.timeCreated.hour);
		formData.append("MinuteCreated", ticketInfo.timeCreated.minute);
		formData.append("DateClosed", dateClosed);
		formData.append("HourClosed", ticketInfo.timeClosed.hour);
		formData.append("MinuteClosed", ticketInfo.timeClosed.minute);
		formData.append("Status", ticketInfo.status);
		return this.http.post(link, formData)
	}

	updateTicketStatus(ticketId, status, solution) {
		let link: string = this.api.slice();
		link = link + "updateTicketStatus";
		let formData = new FormData();
		formData.append("Ticket_Id", ticketId);
		formData.append("Status", status);
		formData.append("Solution", solution);
		return this.http.post(link, formData)
	}

	updateReassignment(ticketId, value) {
		let link: string = this.api.slice();
		link = link + "updateReassignment";
		let formData = new FormData();
		formData.append("Ticket_Id", ticketId);
		formData.append("Value", value);
		return this.http.post(link, formData)
	}

	updateRating(ticketId, rate) {
		let link: string = this.api.slice();
		link = link + "updateRating";
		let formData = new FormData();
		formData.append("Ticket_Id", ticketId);
		formData.append("Rate", rate);
		return this.http.post(link, formData)
	}

	reassignUserTicket(ticketId, supportedBy, categoryId, level) {
		let link: string = this.api.slice();
		link = link + "reassignUserTicket";
		let formData = new FormData();
		formData.append("Ticket_Id", ticketId);
		formData.append("Supported_By", supportedBy);
		formData.append("Category_Id", categoryId);
		formData.append("Level", level);
		return this.http.post(link, formData)
	}

	deleteTicket(ticketId) {
		let link: string = this.api.slice();
		link = link + "deleteTicket";
		let formData = new FormData();
		formData.append("Ticket_Id", ticketId);
		return this.http.post<Ticket>(link, formData);
	}

	getTotalTickets(filteredDate, type) {
		let link: string = this.api.slice();
		link = link + "getTotalTickets";
		let formData = new FormData();
		formData.append("Type", type);
		formData.append("Filtered_Date", filteredDate);
		formData.append("Token", this._authService.getInLocalStorage('currentUser').token);
		return this.http.post(link, formData);
	}

	countTicketStatus(tickets) {
		let status = { "Open": 0, "Closed": 0, "Pending": 0, "Assigned": 0, "Resolved": 0 };
		for(const ticket of tickets) {
			if(ticket.Status=="Open") {
				status.Open = status.Open + 1;
			} else if(ticket.Status=="Closed") {
				status.Closed = status.Closed + 1;
			} else if(ticket.Status=="Pending") {
				status.Pending = status.Pending + 1;
			} else if(ticket.Status=="Assigned") {
				status.Assigned = status.Assigned + 1;
			} else if(ticket.Status=="Resolved") {
				status.Resolved = status.Resolved + 1;
			}
		}
		return status;
	}

	countDepartmentTickets(tickets) {
		let departments: string[] = [];
		let values: number[] = [];
		let resultArray: any = [];
		let ctr:number = 0;
		let doesExist: boolean = false;
		// Inserting department names in an array
		for(const ticket of tickets) {
			for(ctr=0;ctr<departments.length;ctr++) {
				if(departments[ctr].toLowerCase().search(ticket.Name.toLowerCase()) != -1) {
					doesExist = true;
					break;
				} else {
					doesExist = false;
				}
			}
			if(doesExist == false) {
				departments.push(ticket.Name);
			}
		}
		// Counting of tickets in a department
		for(const ticket of tickets) {
			for(ctr=0;ctr<departments.length;ctr++) {
				if(ticket.Name == departments[ctr]) {
					if(isNaN(values[ctr])) {
						values[ctr] = 1;
					} else {
						values[ctr] += 1;
					}
				}
			}
		}
		resultArray.push(departments);
		resultArray.push(values);
		return resultArray;
	}

	getTicketComments(ticketId) {
		let link: string = this.api.slice();
		link = link + "getTicketComments";
		let formData = new FormData();
		formData.append("Ticket_Id", ticketId);
		return this.http.post(link, formData);
	}

	insertComment(ticketId, comment) {
		let link: string = this.api.slice();
		link = link + "insertComment";
		let formData = new FormData();
		formData.append("Ticket_Id", ticketId);
		formData.append("Comment", comment);
		formData.append("Token", this._authService.getInLocalStorage('currentUser').token);
		return this.http.post<any>(link, formData);
	}

	isTicketIssued(ticketId: number) {
		let link: string = this.api.slice() + "isTicketIssued";
		let formData: FormData = new FormData();
		formData.append("Ticket_Id", ticketId.toString());
		formData.append("Token", this._authService.getInLocalStorage('currentUser').token);
		return this.http.post<any>(link, formData);
	}

	isTicketSupported(ticketId: number) {
		let link: string = this.api.slice() + "isTicketSupported";
		let formData: FormData = new FormData();
		formData.append("Ticket_Id", ticketId.toString());
		formData.append("Token", this._authService.getInLocalStorage('currentUser').token);
		return this.http.post<any>(link, formData);
	}

	updateTicketReassignmentReason(ticketid: number, reason: string) {
		let link: string = this.api.slice() + "updateReassignmentReason";
		let formData: FormData = new FormData();
		formData.append("Ticket_Id", ticketid.toString());
		formData.append("Reason", reason);
		return this.http.post<any>(link, formData);
	}

	reopeningOfTicket(ticketid: number, reason: string) {
		let link: string = this.api.slice() + "reopeningOfTicket";
		let formData: FormData = new FormData();
		formData.append("Ticket_Id", ticketid.toString());
		formData.append("Reason", reason);
		return this.http.post<any>(link, formData);
	}

	getIssuedSupportedRecentTickets() {
		let link: string = this.api.slice() + "getIssuedSupportedRecentTickets";
		let formData: FormData = new FormData();
		formData.append("Token", this._authService.getInLocalStorage('currentUser').token);
		return this.http.post<any>(link, formData);
	}

}