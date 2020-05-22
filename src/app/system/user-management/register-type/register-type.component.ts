import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ConfigurationService } from './../../../services/configuration.service';

import { Configuration } from './../../../models/configuration.model';

@Component({
  selector: 'register-type',
  templateUrl: './register-type.component.html',
  styleUrls: ['register-type.component.css']
})

export class RegisterTypeComponent implements OnInit{
	registerTypeForm: FormGroup;

	constructor(private configurationService: ConfigurationService,
				public dialogRef: MatDialogRef<RegisterTypeComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {

		this.registerTypeForm = new FormGroup({
			'type': new FormControl('', Validators.required)
		});

		this.configurationService.getSingleConfigurationByName('registerType').subscribe(
			(configValue: any) => {
				if(configValue.length==0) {
					this.registerTypeForm.setValue({
						'type': null
					})
				} else {
					this.registerTypeForm.setValue({
						'type': configValue[0].Value
					})
				}
			},
			error => console.log(error)
		);

	}

	onRegisterType() {
		if(this.registerTypeForm.valid) {
			let type = this.registerTypeForm.value.type
			this.configurationService.addUpdateConfiguration('registerType', type).subscribe(
				() => {
					this.cancel();
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}

	cancel(): void {
		this.dialogRef.close();
		this.registerTypeForm.reset();
	}


}