import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { CategoryService } from './../../../../services/category.service';

@Component({
  selector: 'category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['category-add.component.css']
})

export class CategoryAddComponent implements OnInit{

	categoryForm: FormGroup;

	constructor(private categoryService: CategoryService,
				public dialogRef: MatDialogRef<CategoryAddComponent>,
    			@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {
		this.categoryForm = new FormGroup({
			"name": new FormControl(null, Validators.required, this.categoryAlreadyExists.bind(this)),
			"desc": new FormControl(null)
		});
	}

	onAddCategory() {
		if(this.categoryForm.valid) {
			this.categoryService.insertCategory(this.categoryForm.value.name, this.categoryForm.value.desc).subscribe(
				(data) => {
					this.cancel();
					this.categoryService.notification.next();
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}

	cancel(): void {
		this.dialogRef.close();
		this.categoryForm.reset();
	}

	categoryAlreadyExists(control:FormControl): Promise<any>|Observable<any> {
		const category = control.value;
		const promise = new Promise<any>((resolve, reject) => {
			this.categoryService.doesCategoryExists(category).subscribe((data: boolean) => {
				console.log(data)
				if(data == true) {
					this.categoryForm.get("name").setErrors({categoryExists: true});
				} else {
					this.categoryForm.get("name").setErrors(null);
				}
			})
		})
		return promise;
	}


}