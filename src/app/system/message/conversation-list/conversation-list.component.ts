import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';
import { ProfilePicturesLocation } from './../../locations';

import { ConversationList } from './../../../models/conversation-list.model';
import { MessageService } from './../../../services/message.service';

@Component({
	selector: 'conversation-list',
	templateUrl: './conversation-list.component.html',
	styleUrls: ['./conversation-list.component.css']
})

export class ConversationListComponent implements OnInit, OnDestroy{
	pictureLocation: string = ProfilePicturesLocation;
	conversations: any;
	refresh: Subscription;
	constructor(private messageService: MessageService) {}

	ngOnInit() {
		const refreshInterval = interval(1000);
		this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
			this.messageService.getConversationsList().subscribe((data) => {
				this.conversations = data;
			}, error => console.log(error))
		});
		this.messageService.getConversationsList().subscribe((data) => {
			// console.log(data);
			this.conversations = data;
		}, error => console.log(error))
	}

	ngOnDestroy() {
		this.refresh.unsubscribe();
	}
	    
}