import { Component, OnInit } from '@angular/core';

import { WebsiteLocation } from './../../system/locations'

@Component({
	selector: 'app-website-component', 
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class WebsiteHomeComponent implements OnInit {
	location:string
	
	ngOnInit() {
		this.location = WebsiteLocation;
	}

}