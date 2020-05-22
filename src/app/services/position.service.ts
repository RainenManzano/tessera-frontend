import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Position } from './../models/position.model';
import { ApiLocation } from './../system/locations';

@Injectable()
export class PositionService {
	private api: string;
	notification = new Subject();

	constructor(private http: HttpClient) {
		this.api = ApiLocation + "transacPosition.php?action=";
	}

	insertPosition(name, desc, department) {
		let link: string = this.api.slice();
		link = link + "addPosition"
		let formData = new FormData();
		formData.append("Position_Name", name);
		formData.append("Position_Desc", desc);
		formData.append("Department", department);
		return this.http.post(link, formData);
	}

	getAllPosition() {
		let link: string = this.api.slice();
		link = link + "getPosition"
		return this.http.get<Position[]>(link);
	}

	getSpecificPosition(positionId) {
		let link: string = this.api.slice();
		link = link + "getSinglePosition";
		let formData = new FormData();
		formData.set("Position_Id", positionId);
		return this.http.post<Position>(link, formData);
	}

	updatePosition(name, description, department, positionId) {
		let link: string = this.api.slice();
		link = link + "updatePosition";
		let formData = new FormData();
		formData.append("Position_Name", name);
		formData.append("Position_Desc", description);
		formData.append("Department", department);
		formData.append("Position_Id", positionId);
		return this.http.post<any>(link, formData);
	}

	deletePosition(positionId) {
		let link: string = this.api.slice();
		link = link + "deletePosition";
		let formData = new FormData();
		formData.append("Position_Id", positionId);
		return this.http.post(link, formData);
	}

	doesPositionExists(position) {
		let link: string = this.api.slice();
		link = link + "doesPositionExists";
		let formData = new FormData();
		formData.append("Position", position);
		return this.http.post(link, formData);
	}

}