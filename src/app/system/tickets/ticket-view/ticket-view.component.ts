import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';
import { ProfilePicturesLocation } from './../../locations';

import { TicketService } from './../../../services/ticket.service';
import { AuthenticationService } from './../../../services/authentication.service';

import { Ticket } from './../../../models/ticket.model';

import { TicketCloseComponent } from './../ticket-close/ticket-close.component';
import { TicketReassignComponent } from './../ticket-reassign/ticket-reassign.component';
import { TicketUpdateStatusComponent } from './../ticket-update-status/ticket-update-status.component';
import { TicketReopenComponent } from './../ticket-reopen/ticket-reopen.component';
import { AuditTrailComponent } from './../audit-trails/audit-trails.component';

@Component({
  selector: 'ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['ticket-view.component.css']
})

export class TicketViewComponent implements OnInit{
	refresh: Subscription;
	ticketComments: any;
	ticketInfo: Ticket;
	ticketId: number;
	type: string;
	location: string;
	role: number;

	statusForm: FormGroup;
	commentForm: FormGroup;

	isIssued: boolean = false;
	isSupported: boolean = false;

	constructor(private ticketService: TicketService,
				private _authService: AuthenticationService,
				private router: Router,
				private route: ActivatedRoute,
				private _bottomSheet: MatBottomSheet,
				public dialog: MatDialog) {}

	ngOnInit() {
		this.type = this.route.snapshot.queryParams["type"];
		this.location = ProfilePicturesLocation;
		this.statusForm = new FormGroup({
			'status': new FormControl(null),
			'solution': new FormControl('')
		});
		this.commentForm = new FormGroup({
			'comment': new FormControl("")
		});
		const refreshInterval = interval(1000);
	    this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
	    	this.updateData();
	    }, error => console.log(error));
		this.route.params.subscribe( (params: Params) => {
			this.ticketId = +params["id"];
			this.updateData();
		});
		this.ticketService.notification.subscribe( () => {
			this.ticketService.getSingleTicket(this.ticketId).subscribe( (ticket: Ticket) => {
				this.ticketInfo = ticket[0];
				this.statusForm.setValue({
					'status': ticket[0].Status,
					'solution': ticket[0].Solution,
				});
			}, error => console.log(error));
		}, error => console.log(error));
	}

	updateData() {
		forkJoin(
			this._authService.getRole(),
			this.ticketService.getSingleTicket(this.ticketId),
			this.ticketService.getTicketComments(this.ticketId),
			this.ticketService.isTicketIssued(this.ticketId),
			this.ticketService.isTicketSupported(this.ticketId)
		).subscribe( ([role, ticket, comments, isIssued, isSupported]: [number, Ticket, any, boolean, boolean]) => {
			// console.log(role);
			// console.log(ticket);
			// console.log(comments);
			this.role = +role;
			this.ticketInfo = ticket[0];
			this.statusForm.setValue({
				'status': ticket[0].Status,
				'solution': ticket[0].Solution
			});
			this.ticketComments = comments;
			this.isIssued = isIssued
			this.isSupported = isSupported
		}, error => console.log(error));
	}

	onChangeStatusColor(status: string) {
		let color: string;
		switch(status) {
			case 'Open':
				color = "#4a64d5";
				break;
			case 'Closed': 
				color = "#db3c3c";
				break;
			case 'Pending': 
				color = "#de9309";
				break;
			case 'Resolved': 
				color = "#8e4ec7";
				break;
			case 'Assigned': 
				color = "#008000";
				break;
			case 'Denied': 
				color = "#c7864e";
				break;
		}
		return color;
	}

	onEdit() {
		this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
	}

	onDelete() {
		this.ticketService.deleteTicket(this.ticketId).subscribe(
			() => {
				this.ticketService.notification.next();
				this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
			}
		);
	}

	onSubmitComment() {
		const ticketId = this.ticketId;
		const comment = this.commentForm.value.comment;
		this.ticketService.insertComment(ticketId, comment).subscribe(
			() => {
				this.ticketService.notification.next();
				this.commentForm.setValue({
					comment: ""
				});
			}
		)
	}

	onTicketReassigment() {
		forkJoin(
			this.ticketService.updateReassignment(this.ticketId, 0),
			this.ticketService.reassignUserTicket(this.ticketId, this.ticketInfo.SupportedBy, this.ticketInfo.Category_Id, this.ticketInfo.Level)
		).subscribe(
			([update, ]) => {
				this.ticketService.notification.next();
			}, error => console.log(error)
		);
	}

	onStatusClicked() {
		if((this.isSupported==true)&&(this.ticketInfo.Status=="Open"||this.ticketInfo.Status=="Assigned")) {
			const dialogRef = this.dialog.open(TicketUpdateStatusComponent, {
		        data: {
		        	ticketId: this.ticketId,
		        	status: this.ticketInfo.Status,
		        	solution: this.ticketInfo.Solution
		        }
		    });
		}
	}

	openBottomSheet(): void {
		this._bottomSheet.open(TicketCloseComponent, {
			data: {
				ticketId: this.ticketId,
				solution: this.ticketInfo.Solution,
				supporterName: this.ticketInfo.SupportedFirstname+" "+this.ticketInfo.SupportedMiddlename+" "+this.ticketInfo.SupportedLastname,
				supporterImage: this.ticketInfo.SupporterImage
			}
		});
	};

	openReassignmentDialog(): void {
      const dialogRef = this.dialog.open(TicketReassignComponent, {
        data: {
        	ticketId: this.ticketId,
        	reason: this.ticketInfo.Reassignment_Reason
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
      });
  	};

  	openAuditTrail(): void {
      const dialogRef = this.dialog.open(AuditTrailComponent, {
        data: {
        	ticketId: this.ticketId
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
      });
  	};

  	openReopenDialog(): void {
      const dialogRef = this.dialog.open(TicketReopenComponent, {
        data: {
        	ticketId: this.ticketId,
        	reason: this.ticketInfo.Reopen_Reason
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
      });
  	};

}