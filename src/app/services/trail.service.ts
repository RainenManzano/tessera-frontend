import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiLocation } from './../system/locations';

@Injectable()
export class TrailService {

	private api: string;

	constructor(private http: HttpClient) {
		this.api = ApiLocation + "transacTrail.php?action=";
	}

	getTrailsById(ticketId: number) {
		let link: string = this.api.slice() + "getTrailsById";
		let formData: FormData = new FormData();
		formData.append("Ticket_Id", ticketId.toString());
		return this.http.post<any>(link, formData);
	}


	

	

}