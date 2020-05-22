import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProfilePicturesLocation } from './../../locations';
import { UserService } from './../../../services/user.service';

@Component({
	selector: 'message-search',
	templateUrl: './message-search.component.html',
	styleUrls: ['./message-search.component.css']
})

export class MessageSearchComponent implements OnInit {
	@ViewChild('search', {static: false}) search: ElementRef;
	users: any;
	location:string = ProfilePicturesLocation;
	searchObserver;
	constructor(private _userService: UserService) {}

	ngOnInit() {

	}
	
	searchTicket(searchString: string) {
		if(!this.searchObserver) {
			Observable.create(observer => {
				this.searchObserver = observer
			})
			.pipe(debounceTime(500))
			.pipe(distinctUntilChanged())
			.subscribe( (searchString: string) => {
				this._userService.getAllUsersActive().subscribe((data) => {
					console.log(data);
					this.users = this._userService.searchUser(searchString, data);
				}, error => console.log(error))		
			})
		}
		this.searchObserver.next(searchString);
	}








}