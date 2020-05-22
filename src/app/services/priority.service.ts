import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Priority } from './../models/priority.model';
import { ApiLocation } from './../system/locations';

@Injectable()
export class PriorityService {
	private api: string;
	notification = new Subject();

	constructor(private http: HttpClient) {
		this.api = ApiLocation + "transacPriority.php?action=";
	}

	insertPriority(level: number, days: number, hours: number, minutes: number, label: string) {
		let link: string = this.api.slice();
		link = link + "addPriority";
		let formData = new FormData();
		formData.append("Level", level.toString());
		formData.append("Days", days.toString());
		formData.append("Hours", hours.toString());
		formData.append("Minutes", minutes.toString());
		formData.append("Label", label.toString());
		return this.http.post(link, formData);
	}

	getAllPriority() {
		let link: string = this.api.slice();
		link = link + "getPriority";
		return this.http.get<Priority[]>(link);
	}

	getSpecificPriority(priorityId) {
		let link: string = this.api.slice();
		link = link + "getSinglePriority";
		let formData = new FormData();
		formData.set("Priority_Id", priorityId);
		return this.http.post<Priority>(link, formData);
	}

	updatePriority(level: number, days: number, hours: number, minutes: number, label: string, priorityId: number) {
		let link: string = this.api.slice();
		link = link + "updatePriority";
		let formData = new FormData();
		formData.append("Priority_Id", priorityId.toString());
		formData.append("Level", level.toString());
		formData.append("Days", days.toString());
		formData.append("Hours", hours.toString());
		formData.append("Minutes", minutes.toString());
		formData.append("Label", label);
		return this.http.post<any>(link, formData);
	}

	deletePriority(priorityId) {
		let link: string = this.api.slice();
		link = link + "deletePriority";
		let formData = new FormData();
		formData.append("Priority_Id", priorityId);
		return this.http.post(link, formData);
	}

	doesLevelExists(level: number, id: number) {
		let link: string = this.api.slice();
		link = link + "doesLevelExists";
		let formData = new FormData();
		formData.append("Level", level.toString());
		formData.append("Id", id.toString());
		return this.http.post(link, formData);
	}

	doesLabelExists(label: string, id: number) {
		let link: string = this.api.slice();
		link = link + "doesLabelExists";
		let formData = new FormData();
		formData.append("Label", label);
		formData.append("Id", id.toString());
		return this.http.post(link, formData);
	}

	convertDuration(days, hours, minutes) {
	    let priorityDuration: string = "";
	    if(days!=0) {
	      priorityDuration += days + " day/s "
	    }
	    if(hours!=0) {
	      priorityDuration += hours + " hour/s "
	    }
	    if(minutes!=0) {
	      priorityDuration += minutes + " minute/s "
	    }
	    return priorityDuration;
	  }

}