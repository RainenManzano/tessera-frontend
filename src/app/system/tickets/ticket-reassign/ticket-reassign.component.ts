import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { TicketService } from './../../../services/ticket.service';

@Component({
  selector: 'ticket-reassign',
  templateUrl: './ticket-reassign.component.html',
  styleUrls: ['ticket-reassign.component.css']
})

export class TicketReassignComponent implements OnInit{
	ticketReassignmentForm: FormGroup;

	constructor(private ticketService: TicketService,
				public dialogRef: MatDialogRef<TicketReassignComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {

		// console.log(this.data)
		this.ticketReassignmentForm = new FormGroup({
			'reason': new FormControl(this.data.reason, Validators.required)
		});

	}

	onReassignTicket() {
		if(this.ticketReassignmentForm.valid) {
			let reason = this.ticketReassignmentForm.value.reason;
			this.ticketService.updateTicketReassignmentReason(this.data.ticketId, reason).subscribe(
				() => {
					this.ticketService.notification.next();
					this.cancel();
				}, error => console.log(error)
			);
		}
	}

	cancel(): void {
		this.dialogRef.close();
	}

}