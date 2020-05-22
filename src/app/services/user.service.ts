import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { ApiLocation } from './../system/locations';

@Injectable()
export class UserService {
	private api: string;
	notification = new Subject();
	imageChanged = new Subject();
	bioChanged = new Subject();
	constructor(private http: HttpClient,
				private _authService: AuthenticationService) {
		this.api = ApiLocation + "transacUsers.php?action=";
	}

	insertUser(empId, email, lastname, firstname, middlename,department, position, username, password, role, file, timeStamp) {
		let link: string = this.api.slice();
		link = link + "addUser"
		let formData = new FormData();
		formData.append("Employee_Id", empId);
		formData.append("Lastname", lastname);
		formData.append("Firstname", firstname);
		formData.append("Middlename", middlename);
		formData.append("Department_Id", department);
		formData.append("Position_Id", position);
		formData.append("Username", username);
		formData.append("Pwd", password);
		formData.append("Role", role);
		formData.append("Company_Email", email);
		formData.append("File", file);
		formData.append("TimeStamp", timeStamp);
		return this.http.post(link, formData);
	}

	getAllUser() {
		let link: string = this.api.slice();
		link = link + "getUsers"
		return this.http.get<any>(link);
	}

	getAllUsersActive() {
		let link: string = this.api.slice();
		link = link + "getAllUsersActive"
		return this.http.get<any>(link);
	}

	getSingleUserById(id: number) {
		let link: string = this.api.slice();
		link = link + "getSingleUserById";
		let formData = new FormData();
		formData.append("User_Id", id.toString());
		return this.http.post<any>(link, formData);
	}

	getSingleUserByToken(token: string) {
		let link: string = this.api.slice();
		link = link + "getSingleUserByToken";
		let formData = new FormData();
		formData.append("Token", token);
		return this.http.post<any>(link, formData);
	}

	getLoggedInUser() {
		let link: string = this.api.slice();
		link = link + "getLoggedInUser";
		let formData = new FormData();
		formData.append("Token", this._authService.getInLocalStorage("currentUser").token);
		return this.http.post<any>(link, formData);
	}

	getUsersSupport() {
		let link: string = this.api.slice();
		link = link + "getUsersSupport";
		return this.http.get<any>(link);
	}

	getUsersCount() {
		let link: string = this.api.slice();
		link = link + "getUsersCount";
		return this.http.get(link);
	}

	getSupportsCount() {
		let link: string = this.api.slice();
		link = link + "getSupportsCount";
		return this.http.get(link);
	}

	countUsersByRole(users: any, role: string) {
		let count: number = 0;
		for(let user of users) {
			if(role=="Employee" && user.Role==3) {
				count++;
			} else if(role=="Support"  && (user.Role==1 || user.Role==2)) {
				count++;
			} else if(role=="Head" && user.Role==1) {
				count++;
			}
		}
		return count;
	}

	updateUser(employeeId, email, lastname, firstname, middlename, department, position, role, username, status, userId) {
		let link: string = this.api.slice();
		link = link + "updateUser";
		let formData = new FormData();
		formData.append("Employee_Id", employeeId);
		formData.append("Email", email);
		formData.append("Lastname", lastname);
		formData.append("Firstname", firstname);
		formData.append("Middlename", middlename);
		formData.append("Department_Id", department);
		formData.append("Position_Id", position);
		formData.append("Role", role);
		formData.append("Username", username);
		formData.append("Status", status);
		formData.append("User_Id", userId);
		return this.http.post<any>(link, formData);
	}

	updateUserBio(employeeId, email, firstname, middlename, lastname) {
		let link:string = this.api.slice() + "updateUserBio";
		let formData: FormData = new FormData();
		formData.append("Token", this._authService.getInLocalStorage('currentUser').token);
		formData.append("Employee_Id", employeeId);
		formData.append("Email", email);
		formData.append("Firstname", firstname);
		formData.append("Middlename", middlename);
		formData.append("Lastname", lastname);
		return this.http.post<any>(link, formData);
	}

	updateUserAccount(username, newPassword) {
		let link:string = this.api.slice() + "updateUserAccount";
		let formData: FormData = new FormData();
		formData.append("Token", this._authService.getInLocalStorage('currentUser').token);
		formData.append("Username", username);
		formData.append("New_Password", newPassword);
		return this.http.post<any>(link, formData);
	}

	updateEmail(token, email) {
		let link:string = this.api.slice() + "updateEmail";
		let formData: FormData = new FormData();
		formData.append("Token", token);
		formData.append("Email", email);
		return this.http.post<any>(link, formData);
	}

	deleteUser(userId) {
		let link: string = this.api.slice();
		link = link + "deleteSingleUser";
		let formData = new FormData();
		formData.append("User_Id", userId);
		return this.http.post<any>(link, formData);
	}

	changeProfilePicture(file: File) {
		let link: string = this.api.slice();
		link = link + "changeProfilePicture";
		let formData: FormData = new FormData();
		formData.append("File", file);
		formData.append("TimeStamp", file.lastModified.toString());
		formData.append("Token", this._authService.getInLocalStorage("currentUser").token);
		return this.http.post<any>(link, formData);
	}

	searchUser(searchString, users) {
		const array = [];
		if(searchString=="") {
			return users;
		}
		for(let user of users) {
			let firstname: string = user.Firstname.toLowerCase();
			let lastname: string = user.Lastname.toLowerCase();
			let email: string = user.Company_Email.toLowerCase();
			let fullname: string =user.Firstname.toLowerCase() + " " + user.Lastname.toLowerCase();;
			if(firstname.search(searchString.toLowerCase()) != -1) {
				array.push(user);
			} else if(lastname.search(searchString.toLowerCase()) != -1) {
				array.push(user);
			} else if(email.search(searchString.toLowerCase()) != -1) {
				array.push(user);
			} else if(fullname.search(searchString.toLowerCase()) != -1) {
				array.push(user);
			}
		}
		return array;
	}

	doesEmployeeIdExists(employeeId) {
		let link: string = this.api.slice();
		link = link + "doesEmployeeIdExists";
		let formData = new FormData();
		formData.append("Employee_Id", employeeId);
		return this.http.post<any>(link, formData);
	}

	doesEmailExists(email) {
		let link: string = this.api.slice();
		link = link + "doesEmailExists";
		let formData = new FormData();
		formData.append("Email", email);
		return this.http.post<any>(link, formData);
	}

	doesUsernameExists(username) {
		let link: string = this.api.slice();
		link = link + "doesUsernameExists";
		let formData = new FormData();
		formData.append("Username", username);
		return this.http.post<any>(link, formData);
	}

	passwordSame(password) {
		let link: string = this.api.slice();
		link = link + "passwordSame";
		let formData = new FormData();
		formData.append("Password", password);
		return this.http.post<any>(link, formData);
	}

}