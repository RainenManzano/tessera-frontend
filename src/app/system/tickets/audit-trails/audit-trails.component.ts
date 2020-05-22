import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { TrailService } from './../../../services/trail.service';

@Component({
  selector: 'audit-trails',
  templateUrl: './audit-trails.component.html',
  styleUrls: ['audit-trails.component.css']
})

export class AuditTrailComponent implements OnInit{
	ticketId: number;
	trails: any;
	constructor(private _trailService: TrailService,
				public dialogRef: MatDialogRef<AuditTrailComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {
		this.ticketId = this.data.ticketId;
		this._trailService.getTrailsById(this.ticketId).subscribe((data) => {
			console.log(data)
			this.trails = data;
		}, error => console.log(error));
	}

	cancel(): void {
		this.dialogRef.close();
	}

}