import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Issue } from './../models/issue.model';
import { ApiLocation } from './../system/locations';

@Injectable()
export class IssueService {

	private api: string;
	notification = new Subject();

	constructor(private http: HttpClient) {
		this.api = ApiLocation + "transacIssue.php?action=";
	}

	insertIssue(issueData) {
		let link: string = this.api.slice();
		link = link + "addIssue"
		let formData = new FormData();
		formData.append("Issue", issueData.issue);
		formData.append("Description", issueData.description);
		formData.append("Category_Id", issueData.category);
		formData.append("Priority_Id", issueData.priority);
		return this.http.post(link, formData);
	}

	getAllIssue() {
		let link: string = this.api.slice();
		link = link + "getIssue";
		return this.http.get<Issue[]>(link);
	}

	getSpecificIssue(issueId) {
		let link: string = this.api.slice();
		link = link + "getSingleIssue";
		let formData = new FormData();
		formData.set("Issue_Id", issueId);
		return this.http.post<Issue>(link, formData);
	}

	updateIssue(issueData, issueId) {
		console.log(issueData)
		let link: string = this.api.slice();
		link = link + "updateIssue";
		let formData = new FormData();
		formData.append("Issue", issueData.issue);
		formData.append("Description", issueData.description);
		formData.append("Category_Id", issueData.category);
		formData.append("Priority_Id", issueData.priority);
		formData.append("Issue_Id", issueId);
		return this.http.post<any>(link, formData);
	}

	deleteIssue(issueId) {
		let link: string = this.api.slice();
		link = link + "deleteIssue";
		let formData = new FormData();
		formData.append("Issue_Id", issueId);
		return this.http.post(link, formData);
	}

	getTopIssues() {
		let link: string = this.api.slice();
		link = link + "getTopIssues";
		return this.http.get<any>(link);
	}









}