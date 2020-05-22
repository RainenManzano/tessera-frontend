import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../../angular.material';

import { UserManagementComponent } from './user-management.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { RegisterTypeComponent } from './register-type/register-type.component';

import { SharedModule } from './../../shared/shared.module';

import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
	declarations: [
		UserManagementComponent,
		UsersTableComponent,
		UsersAddComponent,
		UsersViewComponent,
		UsersEditComponent,
		RegisterTypeComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AngularMaterialModule,
		RouterModule,
		SharedModule,
		PipesModule
	],
	entryComponents: [
		UsersAddComponent,
		RegisterTypeComponent
	]
})

export class UserManagementModule {
	
}