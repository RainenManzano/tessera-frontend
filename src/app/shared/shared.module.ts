import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../angular.material';
import { CommonModule } from '@angular/common';

import { StartDetailComponent } from './start-detail/start-detail.component';
import { TableHighlight } from './table-highlight.directive';

@NgModule({
	declarations: [
		StartDetailComponent,
		TableHighlight
	],
	imports: [
		CommonModule,
		RouterModule,
		AngularMaterialModule
	],
	exports: [
		CommonModule,
		StartDetailComponent,
		TableHighlight
	]
})

export class SharedModule {

}