import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { MessageService } from './../../../../services/message.service';
@Component({
	selector: 'message-chat',
	templateUrl: './message-chat.component.html',
	styleUrls: ['./message-chat.component.css']
})

export class MessageChatComponent {
	@ViewChild('message', {static: false}) message: ElementRef;
	recipientId: number;
	constructor(private _route: ActivatedRoute,
					private _messageService: MessageService) {}

	ngOnInit() {
		this._route.params.subscribe((params: Params) => {
			this.recipientId = +params["id"];
		}, error => console.log(error));
	}

	onKeyup(code) {
		if(code=="Enter") {
			this.submitMessage();
		}
	}

	submitMessage() {
		let message: string = this.message.nativeElement.value;
		this._messageService.insertMessage(message, this.recipientId).subscribe( () => {
			this.message.nativeElement.value = "";
		});
	}





	
}