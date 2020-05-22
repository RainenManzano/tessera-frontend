import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthenticationService } from './../../../services/authentication.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit{

	constructor(private route: ActivatedRoute,
					private router: Router,
					private _authService: AuthenticationService) {}

	ngOnInit() {


	}

	onLogout() {
		this._authService.removeInLocalStorage('currentUser');

	}











}