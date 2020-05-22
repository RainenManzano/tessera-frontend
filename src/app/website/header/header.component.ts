import { Component, OnInit } from '@angular/core';

import { WebsiteLocation } from './../../system/locations'

@Component({
	selector: "app-website-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"]
})

export class WebsiteHeaderComponent implements OnInit {
	location: string;
	menus = [
		{path: 'home', title: 'Home', icon: '', class: ''},
		{path: 'about', title: 'About', icon: '', class: ''},
		{path: 'services', title: 'Services', icon: '', class: ''},
		{path: 'contact-us', title: 'Contact Us', icon: '', class: ''},
		{path: 'login', title: 'Sign in', icon: '', class: ''},
	];

	ngOnInit() {
		this.location = WebsiteLocation;
	}






}	
