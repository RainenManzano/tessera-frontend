import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { PositionPipe } from './position.pipe';
import { CategoryIssuePipe } from './category-issue.pipe';
import { RolePipe } from './role.pipe';
import { StatusPipe } from './status.pipe';

@NgModule({
	declarations: [
		PositionPipe,
		CategoryIssuePipe,
		RolePipe,
		StatusPipe
	],
	exports: [
		PositionPipe,
		CategoryIssuePipe,
		RolePipe,
		StatusPipe
	]
})

export class PipesModule {

}