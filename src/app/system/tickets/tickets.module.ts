import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../../angular.material';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './../../shared/shared.module';
import { PipesModule } from './../../pipes/pipes.module';

import { TicketsComponent } from './tickets.component';

import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { AuditTrailComponent } from './audit-trails/audit-trails.component';
import { TicketReassignComponent } from './ticket-reassign/ticket-reassign.component';
import { TicketReopenComponent } from './ticket-reopen/ticket-reopen.component';
import { TicketUpdateStatusComponent } from './ticket-update-status/ticket-update-status.component';
import { TicketCloseComponent } from './ticket-close/ticket-close.component';
import { TicketTableComponent } from './ticket-table/ticket-table.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { TicketHeaderComponent } from './ticket-header/ticket-header.component';

@NgModule({
	declarations: [
		TicketsComponent,
		TicketAddComponent,
		TicketReassignComponent,
		TicketReopenComponent,
		TicketUpdateStatusComponent,
		TicketCloseComponent,
		TicketTableComponent,
		TicketViewComponent,
		TicketEditComponent,
		TicketHeaderComponent,
		AuditTrailComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		AngularMaterialModule,
		NgbTimepickerModule,
		NgbPopoverModule,
		SharedModule,
		PipesModule
	],
	entryComponents: [
		TicketAddComponent,
		TicketCloseComponent,
		TicketReassignComponent,
		TicketUpdateStatusComponent,
		TicketReopenComponent,
		AuditTrailComponent
	]
})

export class TicketsModule {
	
}