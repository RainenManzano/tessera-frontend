import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// import { Observable } from 'rxjs';
// import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { TicketService } from './../../../services/ticket.service';

import { TicketAddComponent } from './../ticket-add/ticket-add.component';

@Component({
	selector: 'ticket-header',
	templateUrl: './ticket-header.component.html',
	styleUrls: [ './ticket-header.component.css' ]
})

export class TicketHeaderComponent implements OnInit {

	// @ViewChild("searchInput", {static: false}) searchInput: ElementRef;
	listOfStatus: string[] = [ 'All', 'Open', 'Closed', 'Pending', 'Assigned', 'Resolved', 'Reassign requests' ];
	activeStatus: string = "All";
	// searchObserver;

	constructor( private _ticketService: TicketService,
					private _route: ActivatedRoute,
             		public dialog: MatDialog) {}
	
	ngOnInit() {

		this._route.queryParams.subscribe( (queryParams: Params) => {
			this.activeStatus = "All";
		});

	}

	openDialog(): void {
	    const dialogRef = this.dialog.open(TicketAddComponent, {
	    	data: {}
	    });
	    dialogRef.afterClosed().subscribe(result => {
	      // console.log('The dialog was closed');
	    });
	}

	onClicked(status: string) {
		this.activeStatus = status;
		// this._ticketService.statusChanged.next(this.activeStatus);
	}

	// searchTicket(searchString: string) {
	// 	if(!this.searchObserver) {
	// 		Observable.create(observer => {
	// 			this.searchObserver = observer
	// 		})
	// 		.pipe(debounceTime(500))
	// 		.pipe(distinctUntilChanged())
	// 		.subscribe( (searchString: string) => {
	// 			this._ticketService.searchStringChanged.next(searchString)
	// 		})
	// 	}
	// 	this.searchObserver.next(searchString);
	// }

}