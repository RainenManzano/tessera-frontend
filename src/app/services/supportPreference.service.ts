import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Support } from './../models/support.model';
import { ApiLocation } from './../system/locations';

@Injectable()
export class SupportPreferenceService {
	private api: string;
	notification = new Subject();

	constructor(private http: HttpClient) {
		this.api = ApiLocation + "transacSupportPreference.php?action=";
	}

	getSupports() {
		let link: string = this.api.slice();
		link = link + "getSupports";
		return this.http.get<any>(link);
	}

	insertPreference(categoryId, supportId) {
		let link: string = this.api.slice();
		link = link + "insertPreference"
		let formData = new FormData();
		formData.append("Category_Id", categoryId);
		formData.append("Support_Id", supportId);
		return this.http.post(link, formData);
	}

	getPreferences(supportId) {
		let link: string = this.api.slice();
		link = link + "getPreferences";
		let formData = new FormData();
		formData.append("Support_Id", supportId);
		return this.http.post<Support[]>(link, formData);
	}

	deletePreference(preferenceId) {
		let link: string = this.api.slice();
		link = link + "deletePreference";
		let formData = new FormData();
		formData.append("Id", preferenceId);
		return this.http.post(link, formData);
	}

}