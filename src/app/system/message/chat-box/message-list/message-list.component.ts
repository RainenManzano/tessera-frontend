import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';
import { ProfilePicturesLocation } from './../../../locations';

import { MessageService } from './../../../../services/message.service';
@Component({
	selector: 'message-list',
	templateUrl: './message-list.component.html',
	styleUrls: ['./message-list.component.css']
})

export class MessageListComponent {
	recipientId: number;
	recipientImg: string;
	messages: any;
	refresh: Subscription;
	constructor(private _route: ActivatedRoute,
					private _messageService: MessageService) {}

	ngOnInit() {
		const refreshInterval = interval(1000);
		this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
			this._messageService.getMessages(this.recipientId).subscribe((data) => {
				this.messages = data;
			}, error => console.log(error));
		});
		this._route.params.subscribe((params: Params) => {
			this.recipientId = +params["id"];
			this._messageService.getMessages(this.recipientId).subscribe((data) => {
				// console.log(data);
				this.messages = data;
			}, error => console.log(error));
		}, error => console.log(error));
		this._messageService.recipientImg.subscribe((img) => {
			this.recipientImg = ProfilePicturesLocation + img;
		}, error => console.log(error));
	}

	ngOnDestroy() {
		this.refresh.unsubscribe();
	}














}