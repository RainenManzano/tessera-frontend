import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../../angular.material';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceDepartmentComponent } from './department/department.component';
import { MaintenancePositionComponent } from './position/position.component';
import { MaintenanceCategoryComponent } from './category/category.component';
import { MaintenancePriorityComponent } from './priority/priority.component';
import { MaintenanceIssueComponent } from './issue/issue.component';
import { MaintenanceSupportComponent } from './support/support.component';

import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryTableComponent } from './category/category-table/category-table.component';
import { CategoryViewComponent } from './category/category-view/category-view.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';

import { IssueAddComponent } from './issue/issue-add/issue-add.component';
import { IssueTableComponent } from './issue/issue-table/issue-table.component';
import { IssueViewComponent } from './issue/issue-view/issue-view.component';
import { IssueEditComponent } from './issue/issue-edit/issue-edit.component';

import { DepartmentAddComponent } from './department/department-add/department-add.component';
import { DepartmentTableComponent } from './department/department-table/department-table.component';
import { DepartmentViewComponent } from './department/department-view/department-view.component';
import { DepartmentEditComponent } from './department/department-edit/department-edit.component';

import { PositionAddComponent } from './position/position-add/position-add.component';
import { PositionTableComponent } from './position/position-table/position-table.component';
import { PositionViewComponent } from './position/position-view/position-view.component';
import { PositionEditComponent } from './position/position-edit/position-edit.component';

import { PriorityAddComponent } from './priority/priority-add/priority-add.component';
import { PriorityTableComponent } from './priority/priority-table/priority-table.component';
import { PriorityViewComponent } from './priority/priority-view/priority-view.component';
import { PriorityEditComponent } from './priority/priority-edit/priority-edit.component';

import { SupportAddComponent } from './support/support-add/support-add.component';
import { SupportTableComponent } from './support/support-table/support-table.component';
import { SupportViewComponent } from './support/support-view/support-view.component';

@NgModule({
	declarations: [
		MaintenanceComponent,
		MaintenanceDepartmentComponent,
		MaintenancePositionComponent,
		MaintenanceCategoryComponent,
		MaintenancePriorityComponent,
		MaintenanceIssueComponent,
		MaintenanceSupportComponent,

		CategoryAddComponent,
		CategoryTableComponent,
		CategoryViewComponent,
		CategoryEditComponent,

		DepartmentAddComponent,
		DepartmentTableComponent,
		DepartmentViewComponent,
		DepartmentEditComponent,

		PositionAddComponent,
		PositionTableComponent,
		PositionViewComponent,
		PositionEditComponent,

		PriorityAddComponent,
		PriorityTableComponent,
		PriorityViewComponent,
		PriorityEditComponent,

		IssueAddComponent,
		IssueTableComponent,
		IssueViewComponent,
		IssueEditComponent,

		SupportAddComponent,
		SupportTableComponent,
		SupportViewComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
		AngularMaterialModule,
		SharedModule
	],
	entryComponents: [
		CategoryAddComponent,
		DepartmentAddComponent,
		PositionAddComponent,
		PriorityAddComponent,
		IssueAddComponent,
		SupportAddComponent
	]
})

export class MaintenanceModule {
	
}