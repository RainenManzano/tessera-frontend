import { MaintenanceDepartmentComponent } from './department/department.component';
import { MaintenanceCategoryComponent } from './category/category.component';
import { MaintenancePriorityComponent } from './priority/priority.component';
import { MaintenanceIssueComponent } from './issue/issue.component';
import { MaintenancePositionComponent } from './position/position.component';
import { MaintenanceSupportComponent } from './support/support.component';
import { StartDetailComponent } from './../../shared/start-detail/start-detail.component';

import { DepartmentViewComponent } from './department/department-view/department-view.component';
import { DepartmentEditComponent } from './department/department-edit/department-edit.component';

import { PositionViewComponent } from './position/position-view/position-view.component';
import { PositionEditComponent } from './position/position-edit/position-edit.component';

import { PriorityViewComponent } from './priority/priority-view/priority-view.component';
import { PriorityEditComponent } from './priority/priority-edit/priority-edit.component';

import { IssueViewComponent } from './issue/issue-view/issue-view.component';
import { IssueEditComponent } from './issue/issue-edit/issue-edit.component';

import { CategoryViewComponent } from './category/category-view/category-view.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';

import { SupportViewComponent } from './support/support-view/support-view.component';

export const MAINTENANCE_ROUTES = [
	{path: 'departments', component: MaintenanceDepartmentComponent, children: [
		{path: '', component: StartDetailComponent},
		{path: ':id', component: DepartmentViewComponent},
		{path: ':id/edit', component: DepartmentEditComponent}
	]},
	{path: 'positions', component: MaintenancePositionComponent, children: [
		{path:'', component: StartDetailComponent},
		{path: ':id', component: PositionViewComponent},
		{path: ':id/edit', component: PositionEditComponent}
	]},
	{path: 'priorities', component: MaintenancePriorityComponent, children: [
		{path:'', component: StartDetailComponent},
		{path: ':id', component: PriorityViewComponent},
		{path: ':id/edit', component: PriorityEditComponent}
	]},
	{path: 'categories', component: MaintenanceCategoryComponent, children: [
		{path:'', component: StartDetailComponent},
		{path: ':id', component: CategoryViewComponent},
		{path: ':id/edit', component: CategoryEditComponent}
	] },
	{path: 'issues', component: MaintenanceIssueComponent, children: [
		{path:'', component: StartDetailComponent},
		{path: ':id', component: IssueViewComponent},
		{path: ':id/edit', component: IssueEditComponent}
	] },
	{path: 'support-preferences', component: MaintenanceSupportComponent, children: [
		{path:'', component: StartDetailComponent},
		{path: ':id', component: SupportViewComponent}
	] }
]