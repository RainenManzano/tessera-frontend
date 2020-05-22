import { Component, OnInit } from '@angular/core';

import { WebsiteLocation } from './../../system/locations'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

	location: string;

  	constructor() { }

	ngOnInit() {
		this.location = WebsiteLocation;
	}

}
