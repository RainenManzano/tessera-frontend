import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ProfilePicturesLocation } from './../../locations';

import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

import { TicketService } from './../../../services/ticket.service';

@Component({
  selector: 'ticket-close',
  templateUrl: './ticket-close.component.html',
  styleUrls: ['ticket-close.component.css']
})

export class TicketCloseComponent implements OnInit{

	first: number = 0;
	second: number = 0;
	third: number = 0;
	fourth: number = 0;
	fifth: number = 0;
	performance: string = "Rate me";
	supportImage: string;

	constructor(private _bottomSheetRef: MatBottomSheetRef<TicketCloseComponent>,
					@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
					private _ticketService: TicketService) {}

	ngOnInit() {
		// console.log(this.data);
		this.supportImage = ProfilePicturesLocation + this.data.supporterImage;
	}

	closeTicket(): void {
		const rate = this.first + this.second + this.third + this.fourth + this.fifth;
		forkJoin(
			this._ticketService.updateTicketStatus(this.data.ticketId, "Closed", this.data.solution),
			this._ticketService.updateRating(this.data.ticketId, rate),
		).subscribe(
			() => {
				this._ticketService.notification.next();
				this._bottomSheetRef.dismiss();
			}
		);
	}

	changeStar(star) {
		if(star=="first") {
			this.first = 1;
			this.second = 0;
			this.third = 0;
			this.fourth = 0;
			this.fifth = 0;
			this.performance = "Poor"
		} else if(star=="second") {
			this.first = 1;
			this.second = 1;
			this.third = 0;
			this.fourth = 0;
			this.fifth = 0;
			this.performance = "Below Average"
		} else if(star=="third") {
			this.first = 1;
			this.second = 1;
			this.third = 1;
			this.fourth = 0;
			this.fifth = 0;
			this.performance = "Average"
		} else if(star=="fourth") {
			this.first = 1;
			this.second = 1;
			this.third = 1;
			this.fourth = 1;
			this.fifth = 0;
			this.performance = "Above Average"
		} else if(star=="fifth") {
			this.first = 1;
			this.second = 1;
			this.third = 1;
			this.fourth = 1;
			this.fifth = 1;
			this.performance = "Excellent"
		}
	}

}