import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../../angular.material';

import { ReportsComponent } from './reports.component';

@NgModule({
	declarations: [
		ReportsComponent
	],
	imports: [
		CommonModule,
		AngularMaterialModule
	]
})

export class ReportsModule {
	
}