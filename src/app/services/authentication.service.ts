import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';	
import { ApiLocation } from './../system/locations';

@Injectable()

export class AuthenticationService {

	private api: string;

	constructor(private httpClient: HttpClient,
					private _router: Router) {
		this.api = ApiLocation + "transacLogin.php?action=";
	}

	checkLoginInfo(loginData) {
		let link:string = this.api.slice();
		link = link + "login";
		let formData = new FormData();
		formData.append("username", loginData.username);
		formData.append("password", loginData.password);
		return this.httpClient.post(link, formData);
	}

	confirmCode(userId, code) {
		let link:string = this.api.slice();
		link = link + "verifyCode";
		let formData = new FormData();
		formData.append("User_Id", userId);
		formData.append("Code", code);
		return this.httpClient.post(link, formData);
	}

	resendCode(userId) {
		let link:string = this.api.slice();
		link = link + "resendCode";
		let formData = new FormData();
		formData.append("User_Id", userId);
		return this.httpClient.post(link, formData);
	}

	storeInLocalStorage(key, data) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	getInLocalStorage(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	removeInLocalStorage(key) {
		localStorage.removeItem(key);
		this._router.navigate(['login']);
	}

	getRole() {
		let link:string = this.api.slice() + "getRole";
		let formData = new FormData();
		formData.append("Token", this.getInLocalStorage('currentUser').token);
		return this.httpClient.post(link, formData);
	}

}