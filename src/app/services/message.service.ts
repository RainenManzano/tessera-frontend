import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';	
import { Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ApiLocation } from './../system/locations';

@Injectable()

export class MessageService {
	private api: string;
	recipientName = new Subject();
	recipientImg = new Subject();
	constructor(private http: HttpClient,
					private _authService: AuthenticationService) {
		this.api = ApiLocation + "transacMessage.php?action=";
	}

	getConversationsList() {
		let link: string = this.api.slice();
		link = link + "getConversationsList";
		let formData = new FormData();
		formData.append("Token", this._authService.getInLocalStorage("currentUser").token);
		return this.http.post<any>(link, formData);
	}

	getMessages(recipientId: number) {
		let link: string = this.api.slice();
		link = link + "getMessages";
		let formData = new FormData();
		formData.append("Token", this._authService.getInLocalStorage("currentUser").token);
		formData.append("Recipient", recipientId.toString());
		return this.http.post<any>(link, formData);
	}

	insertMessage(message: string, recipientId: number) {
		let link: string = this.api.slice();
		link = link + "insertMessage";
		let formData = new FormData();
		formData.append("Token", this._authService.getInLocalStorage("currentUser").token);
		formData.append("Recipient", recipientId.toString());
		formData.append("Message", message);
		return this.http.post<any>(link, formData);
	}






}