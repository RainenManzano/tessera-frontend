import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { NotificationService } from './../../../services/notification.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['notification.component.css']
})

export class NotificationComponent implements OnInit, OnDestroy{
	refresh: Subscription;
	notifications: any;
	countNotifications: string;

	constructor(private route: ActivatedRoute,
					private router: Router,
					private _notification: NotificationService) {}

	ngOnInit() {
		const seconds = interval(3000);
		this.refresh = seconds.pipe(timeInterval()).subscribe( () => {
			this.refreshNotification();
		}, error => console.log(error));
		this.refreshNotification();
	}

	ngOnDestroy() {
		this.refresh.unsubscribe();
	}

	readNotification(id: number) {
		this._notification.readNotification(id).subscribe( () => {
			this.refreshNotification();
		}, error => console.log(error));
	}

	readAll() {
		let idArray: any = [];
		for(let notification of this.notifications) {
			if(notification.Checked==0) {
				idArray.push(notification.Notification_Id);
			}
		}
		this._notification.readAllNotification(idArray).subscribe( () => {
			this.refreshNotification();
		}, error => console.log(error));
	}

	refreshNotification() {
		this._notification.getAllNotifications().subscribe( (notifications: any) => {
			this.notifications = notifications;
			let count: number = this._notification.countNotChecked(notifications);
			this.countNotifications = (count!=0)? count.toString(): "";
		}, error => console.log(error));
	}



}