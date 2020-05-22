import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SupportPreferenceService } from './../../../../services/supportPreference.service';
import { CategoryService } from './../../../../services/category.service';

import { Category } from './../../../../models/category.model';

@Component({
  selector: 'support-add',
  templateUrl: './support-add.component.html',
  styleUrls: ['support-add.component.css']
})

export class SupportAddComponent implements OnInit{

	preferenceForm: FormGroup;	
	categories: Category[];

	constructor(private categoryService: CategoryService,
				private preferenceService: SupportPreferenceService,
				public dialogRef: MatDialogRef<SupportAddComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {

		// console.log(this.data);
		this.preferenceForm = new FormGroup({
			'category': new FormControl(null, Validators.required)
		});

		this.categoryService.getAllCategory().subscribe(
			(categories: Category[]) => {
				this.categories = categories;
			},
			error => console.log(error)
		);

	}

	onAddPreference() {
		if(this.preferenceForm.valid) {
			this.preferenceService.insertPreference(this.preferenceForm.value.category, this.data.supportId).subscribe(
				(data) => {
					this.cancel();
					this.preferenceService.notification.next();
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}

	cancel(): void {
		this.dialogRef.close();
		this.preferenceForm.reset();
	}

}