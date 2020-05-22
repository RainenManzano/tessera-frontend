import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CategoryService } from './../../../../services/category.service';

import { Category } from './../../../../models/category.model';

@Component({
  selector: 'category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['category-edit.component.css']
})

export class CategoryEditComponent implements OnInit{

	category: Category;
	categoryId: number;
	categoryForm: FormGroup;

	constructor(private categoryService: CategoryService,
				private route: ActivatedRoute,
				private router: Router) {}

	ngOnInit() {

		this.categoryForm = new FormGroup({
			'name': new FormControl(null, Validators.required),
			'description': new FormControl(null)
		});

		this.route.params.subscribe(
			(params: Params) => {
				this.categoryId = +params["id"];
				this.categoryService.getSpecificCategory(this.categoryId).subscribe(
					(category: Category) => {
						this.category = category[0];
						this.categoryForm.setValue({
							'name': this.category.Name,
							'description': this.category.Description
						});
					}
				);
			}
		);

	}

	onSubmit() {
		if(this.categoryForm.status!="INVALID") {
			this.categoryService.updateCategory(this.categoryForm.value.name, this.categoryForm.value.description, this.categoryId).subscribe(
					() => {
						this.router.navigate(['../'], {relativeTo: this.route});
						this.categoryService.notification.next();
					},
					error => console.log(error)
			);
		}
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}


}