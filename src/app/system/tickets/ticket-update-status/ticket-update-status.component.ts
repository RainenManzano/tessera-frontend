import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { TicketService } from './../../../services/ticket.service';

@Component({
  selector: 'ticket-update-status',
  templateUrl: './ticket-update-status.component.html',
  styleUrls: ['ticket-update-status.component.css']
})

export class TicketUpdateStatusComponent implements OnInit{
	statusForm: FormGroup;

	constructor(private ticketService: TicketService,
				public dialogRef: MatDialogRef<TicketUpdateStatusComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {
		// console.log(this.data);
		let solution = (this.data.status=='Resolved')? this.data.solution: '';
		this.statusForm = new FormGroup({
			'status': new FormControl(this.data.status, Validators.required),
			'solution': new FormControl({value: solution, disabled: true}, Validators.required)
		});
	}

	onUpdateTicketStatus() {
		// console.log(this.statusForm)
		if(this.statusForm.valid) {
			let status = this.statusForm.value.status;
			let solution = this.statusForm.value.solution;
			this.ticketService.updateTicketStatus(this.data.ticketId, status, solution).subscribe(
				(data) => {
					// console.log(data);
					this.ticketService.notification.next();
					this.cancel();
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}

	onStatusChange(status) {
		if(status=="Resolved") {
			this.statusForm['controls'].solution.enable();
			this.statusForm.patchValue({
				solution: this.data.solution
			});
		} else {
			this.statusForm['controls'].solution.disable();
			this.statusForm.patchValue({
				solution: ''
			});
		}
		
	}

	cancel(): void {
		this.dialogRef.close();
	}

}