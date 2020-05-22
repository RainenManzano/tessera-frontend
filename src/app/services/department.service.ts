import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Department } from './../models/department.model';
import { ApiLocation } from './../system/locations';

@Injectable()
export class DepartmentService {

	private api: string;
	notification = new Subject();

	constructor(private http: HttpClient) {
		this.api = ApiLocation + "transacDepartment.php?action=";
	}

	insertDepartment(departmentName: string, departmentDesc: string) {
		let link: string = this.api.slice();
		link = link + "addDepartment"
		let formData = new FormData();
		formData.append("Name", departmentName);
		formData.append("Description", departmentDesc);
		return this.http.post(link, formData);
	}

	getAllDepartment() {
		let link: string = this.api.slice();
		link = link + "getDepartment"
		return this.http.get<Department[]>(link);
	}

	getSpecificDepartment(departmentId) {
		let link: string = this.api.slice();
		link = link + "getSingleDepartment";
		let formData = new FormData();
		formData.append("Department_Id", departmentId);
		return this.http.post<Department>(link, formData);
	}

	updateDepartment(departmentName, departmentDesc, departmentId) {
		let link: string = this.api.slice();
		link = link + "updateDepartment";
		let formData = new FormData();
		formData.append("Name", departmentName);
		formData.append("Description", departmentDesc);
		formData.append("Department_Id", departmentId);
		return this.http.post<any>(link, formData);
	}

	deleteDepartment(departmentId) {
		let link: string = this.api.slice();
		link = link + "deleteDepartment";
		let formData = new FormData();
		formData.append("Department_Id", departmentId);
		return this.http.post(link, formData);
	}

	doesDepartmentExists(department) {
		let link: string = this.api.slice();
		link = link + "doesDepartmentExists";
		let formData = new FormData();
		formData.append("Department", department);
		return this.http.post(link, formData);
	}

}