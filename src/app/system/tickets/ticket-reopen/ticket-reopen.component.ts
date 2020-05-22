import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { TicketService } from './../../../services/ticket.service';

@Component({
  selector: 'ticket-reopen',
  templateUrl: './ticket-reopen.component.html',
  styleUrls: ['ticket-reopen.component.css']
})

export class TicketReopenComponent implements OnInit{
	ticketReopenForm: FormGroup;

	constructor(private ticketService: TicketService,
				public dialogRef: MatDialogRef<TicketReopenComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {
		this.ticketReopenForm = new FormGroup({
			'reason': new FormControl(this.data.reason, Validators.required)
		});
	}

	onReopenTicket() {
		if(this.ticketReopenForm.valid) {
			let reason = this.ticketReopenForm.value.reason;
			this.ticketService.reopeningOfTicket(this.data.ticketId, reason).subscribe(
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