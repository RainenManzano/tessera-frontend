import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UserService } from './../../../../services/user.service';
import { MessageService } from './../../../../services/message.service';
@Component({
	selector: 'message-header',
	templateUrl: './message-header.component.html',
	styleUrls: ['./message-header.component.css']
})

export class MessageHeaderComponent implements OnInit {
	recipientId: number;
	recipientName: string;
	constructor(private route: ActivatedRoute,
					private _userService: UserService,
					private _messageService: MessageService) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.recipientId = +params["id"];
			this._userService.getSingleUserById(this.recipientId).subscribe((data) => {
				// console.log(data);
				this.recipientName = data[0].Firstname + " " + data[0].Lastname
				this._messageService.recipientImg.next(data[0].Img_Name);
			}, error => console.log(error));
		}, error => console.log(error));
	}









}