import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

@Injectable()

export class Validators {

	constructor(private _userService: UserService) { }

	// empIdAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
	// 	const id = control.value;
	// 	const promise = new Promise<any>((resolve, reject) => {
	// 		this._userService.doesEmployeeIdExists(id).subscribe((data: boolean) => {
	// 			if(data == true) {
	// 				this.userForm.get("idForm.empId").setErrors({idExists: true});
	// 			} else {
	// 				this.userForm.get("idForm.empId").setErrors(null);
	// 			}
	// 		})
	// 	})
	// 	return promise;
	// }

}