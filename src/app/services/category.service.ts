import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Category } from './../models/category.model';
import { ApiLocation } from './../system/locations';

@Injectable()
export class CategoryService {

	private api: string;

	constructor(private http: HttpClient) {
		this.api = ApiLocation + "transacCategory.php?action=";
	}

	notification = new Subject();

	insertCategory(name, description) {
		let link: string = this.api.slice();
		link = link + "addCategory"
		let formData = new FormData();
		formData.append("Name", name);
		formData.append("Description", description);
		return this.http.post(link, formData);
	}

	getAllCategory() {
		let link: string = this.api.slice();
		link = link + "getCategory";
		return this.http.get<Category[]>(link);
	}

	getSpecificCategory(categoryId) {
		let link: string = this.api.slice();
		link = link + "getSingleCategory";
		let formData = new FormData();
		formData.set("Category_Id", categoryId);
		return this.http.post<Category>(link, formData);
	}

	updateCategory(name, description, categoryId) {
		let link: string = this.api.slice();
		link = link + "updateCategory";
		let formData = new FormData();
		formData.append("Name", name);
		formData.append("Description", description);
		formData.append("Category_Id", categoryId);
		return this.http.post<any>(link, formData);
	}

	deleteCategory(categoryId) {
		let link: string = this.api.slice();
		link = link + "deleteCategory";
		let formData = new FormData();
		formData.append("Category_Id", categoryId);
		return this.http.post(link, formData);
	}

	doesCategoryExists(category) {
		let link: string = this.api.slice();
		link = link + "doesCategoryExists";
		let formData = new FormData();
		formData.append("Category", category);
		return this.http.post(link, formData);
	}

}