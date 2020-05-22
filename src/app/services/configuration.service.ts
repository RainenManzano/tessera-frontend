import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Configuration } from './../models/configuration.model';
import { ApiLocation } from './../system/locations';

@Injectable()
export class ConfigurationService {

	private api: string;

	constructor(private http: HttpClient) {
		this.api = ApiLocation + "transacConfiguration.php?action=";
	}

	addUpdateConfiguration(configName, value) {
		let link: string = this.api.slice();
		link = link + "addConfiguration"
		let formData = new FormData();
		formData.append("Event_Name", configName);
		formData.append("Value", value);
		return this.http.post(link, formData);
	}

	getSingleConfigurationByName(name) {
		let link: string = this.api.slice();
		link = link + "getSingleConfigurationByName";
		let formData = new FormData();
		formData.set("Event_Name", name);
		return this.http.post<Configuration>(link, formData);
	}

	backupDatabase() {
		let link: string = this.api.slice() + 'backupDatabase';
		window.open(link, '_blank')
	}




}