import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { CategoryService } from './../../../../services/category.service';
import { Category } from './../../../../models/category.model';

@Component({
  selector: 'category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['category-view.component.css']
})

export class CategoryViewComponent implements OnInit, OnDestroy {
	refresh: Subscription;
	categoryInfo: Category;
	categoryId: number;

	constructor(private categoryService: CategoryService,
					private router: Router,
					private route: ActivatedRoute) {}

	ngOnInit() {
		const refreshInterval = interval(5000);
		this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
			this.categoryService.getSpecificCategory(this.categoryId).subscribe((data: Category) => {
				this.categoryInfo = data[0];
			}, error => console.log(error));
		});
		this.route.params.subscribe((params: Params) => {
			this.categoryId = +params["id"];
			this.categoryService.getSpecificCategory(this.categoryId).subscribe((data: Category) => {
				this.categoryInfo = data[0];
			}, error => console.log(error));
		});
	}

	ngOnDestroy() {
		this.refresh.unsubscribe();
	}

	onEdit() {
		this.router.navigate(['edit'], {relativeTo: this.route});
	}

	onDelete() {
		this.categoryService.deleteCategory(this.categoryId).subscribe(() => {
			this.categoryService.notification.next();
			this.router.navigate(['../'], {relativeTo: this.route});
		});
	}





}