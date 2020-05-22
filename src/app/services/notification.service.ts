import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiLocation } from './../system/locations';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotificationService {

	private api: string;
	notification = new Subject();

	constructor(private http: HttpClient,
					private _authService: AuthenticationService) {
		this.api = ApiLocation + "transacNotification.php?action=";
	}

	getAllNotifications() {
		let link: string = this.api.slice() + "getAllNotifications";
		let formData: FormData = new FormData();
		formData.append("Token", this._authService.getInLocalStorage('currentUser').token);
		return this.http.post<any>(link, formData);
	}

	readNotification(id: number) {
		let link: string = this.api.slice() + "readNotification";
		let formData: FormData = new FormData();
		formData.append("Notification_Id", id.toString());
		return this.http.post<any>(link, formData);
	}

	readAllNotification(idArray) {
		let link: string = this.api.slice() + "readAllNotification";
		let formData: FormData = new FormData();
		formData.append("Notification_Id_Array", idArray);
		return this.http.post<any>(link, formData);
	}

	countNotChecked(notifications) {
		let count: number = 0;
		for(let notif of notifications) {
			if(notif.Checked==0) {
				count++;
			}
		}
		return count;
	}

	

	

}