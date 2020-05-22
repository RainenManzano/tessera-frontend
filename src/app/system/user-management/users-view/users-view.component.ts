import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';
import { ProfilePicturesLocation } from './../../locations';

import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user.model';

@Component({
  selector: 'users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['users-view.component.css']
})

export class UsersViewComponent implements OnInit, OnDestroy {
	refresh: Subscription;
	userInfo: User;
	userInfoImg: string;
	userId: number;

	constructor(private userService: UserService,
				private router: Router,
				private route: ActivatedRoute) {}

	ngOnInit() {
		const seconds = interval(5000);
		this.refresh = seconds.pipe(timeInterval()).subscribe( () => {
			this.userService.getSingleUserById(this.userId).subscribe( (data: User) => {
				this.userInfo = data[0];
				this.userInfoImg = ProfilePicturesLocation + data[0].Img_Name;
			}, error => console.log(error));
		}, error => console.log(error));
		this.route.params.subscribe( (params: Params) => {
			this.userId = +params["id"];
			this.userService.getSingleUserById(this.userId).subscribe( (data: User) => {
				// console.log(data);
				this.userInfo = data[0];
				this.userInfoImg = ProfilePicturesLocation + data[0].Img_Name;
			}, error => console.log(error));
		});
	}

	ngOnDestroy() {
		this.refresh.unsubscribe();
	}

	onEdit() {
		this.router.navigate(['edit'], {relativeTo: this.route});
	}

	statusColor(status: number) {
		if(status==1) {
			return "green";
		} else {
			return "red";
		}
	}


}