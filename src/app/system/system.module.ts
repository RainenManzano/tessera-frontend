import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../angular.material';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

import { SystemRoutesModule } from './system-routes.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { TicketsModule } from './tickets/tickets.module';
import { UserManagementModule } from './user-management/user-management.module';
import { ReportsModule } from './reports/reports.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { MessageModule } from './message/message.module';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';

// import { SharedModule } from './../shared/shared.module';

import { SystemComponent } from './system.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NotificationComponent } from './sidenav/notification/notification.component';
import { ProfileComponent } from './sidenav/profile/profile.component';


@NgModule({
	declarations: [
		SystemComponent,
		SidenavComponent,
		NotificationComponent,
		ProfileComponent
	],
	imports: [
		CommonModule,
		DashboardModule, 
		TicketsModule,
		UserManagementModule,
		ReportsModule,
		MaintenanceModule,
		MessageModule,
		ProfileSettingsModule,
		SystemRoutesModule,
		AngularMaterialModule,
		NgbPopoverModule
	]	
})

export class SystemModule {

}