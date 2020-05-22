import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../../angular.material';

import { DashboardComponent } from './dashboard.component';
import { AllTicketsDashboardComponent } from './all-tickets/all-tickets.component';
import { IssuedTicketsDashboardComponent } from './issued-tickets/issued-tickets.component';
import { SupportedTicketsDashboardComponent } from './supported-tickets/supported-tickets.component';
import { DepartmentsDashboardComponent } from './departments/departments.component';

@NgModule({
	declarations: [
		DashboardComponent,
		AllTicketsDashboardComponent,
		IssuedTicketsDashboardComponent,
		SupportedTicketsDashboardComponent,
		DepartmentsDashboardComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		AngularMaterialModule,
		ChartsModule
	]
})

export class DashboardModule {

}