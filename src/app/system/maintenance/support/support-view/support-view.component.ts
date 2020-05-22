import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SupportPreferenceService } from './../../../../services/supportPreference.service';
import { Support } from './../../../../models/support.model';
import { SupportAddComponent } from './../support-add/support-add.component';

@Component({
  selector: 'support-view',
  templateUrl: './support-view.component.html',
  styleUrls: ['support-view.component.css']
})

export class SupportViewComponent implements OnInit, OnDestroy {
	refresh: Subscription;
	supportPreference: Support[];
	supportId: number;
	supportName: {
		firstname: string, 
		middlename: string,
		lastname: string
	};

	constructor(private preferenceService: SupportPreferenceService,
					private route: ActivatedRoute,
					private router: Router,
	              	public dialog: MatDialog) {}

	ngOnInit() {
		const refreshInterval = interval(5000);
		this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
			this.preferenceService.getPreferences(this.supportId).subscribe((data: Support[]) => {
				this.setData(data);
			},	error => console.log(error));
		});
		this.route.params.subscribe((params: Params) => {
			this.supportId = +params['id'];
			this.preferenceService.getPreferences(this.supportId).subscribe((data: Support[]) => {
				// console.log(data);
				this.setData(data);
			},	error => console.log(error));
		});
		this.preferenceService.notification.subscribe(() => {
			this.preferenceService.getPreferences(this.supportId).subscribe((data: Support[]) => {
				this.setData(data);
			}, error => console.log(error));
		}, error => console.log(error));
	}

	ngOnDestroy() {
		this.refresh.unsubscribe();
	}

	openDialog(): void {
	    const dialogRef = this.dialog.open(SupportAddComponent, {
	    	data: {
	    		"supportId": this.supportId
	    	}
	    });
	    dialogRef.afterClosed().subscribe(result => {
	    	// console.log('The dialog was closed');
	    });
	}

	onDelete(preferenceId: number) {
		let valid = confirm("Are you sure you want to delete the category?");
		if(valid) {
			this.preferenceService.deletePreference(preferenceId).subscribe(
				() => {
					this.preferenceService.notification.next();
				}
			);
		}
	}

	setData(supportPreference: Support[]) {
		this.supportName = {
			firstname: supportPreference[0].Firstname,
			middlename: supportPreference[0].Middlename,
			lastname: supportPreference[0].Lastname
		};
		if(supportPreference[0].Id != null) {
			this.supportPreference = supportPreference;
		} else {
			this.supportPreference = [];
		}
	}


}