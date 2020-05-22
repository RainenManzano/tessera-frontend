import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';

import { StartDetailComponent } from './../shared/start-detail/start-detail.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { TicketsComponent } from './tickets/tickets.component';
import { TicketViewComponent } from './tickets/ticket-view/ticket-view.component';
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component';

import { UserManagementComponent } from './user-management/user-management.component';
import { UsersViewComponent } from './user-management/users-view/users-view.component';
import { UsersEditComponent } from './user-management/users-edit/users-edit.component';

import { ReportsComponent } from './reports/reports.component';

import { MessageComponent } from './message/message.component';

import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

import { MAINTENANCE_ROUTES } from './maintenance/maintenance.routes';
import { MESSAGE_ROUTES } from './message/message.routes';

const systemRoutes: Routes = [
	{path: 'sts', component: SystemComponent, children: [
		{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
		{path: 'dashboard', component: DashboardComponent},
		{path: 'tickets', component: TicketsComponent, children: [
			{path: '', component: StartDetailComponent },
			{path: ':id', component: TicketViewComponent},
			{path: ':id/edit', component: TicketEditComponent}
		]},
		{path: 'user-management', component: UserManagementComponent, children: [
			{path: '', component: StartDetailComponent},
			{path: ':id', component: UsersViewComponent},
			{path: ':id/edit', component: UsersEditComponent}
		]},
		{path: 'reports', component: ReportsComponent},
		{path: 'maintenance', children: MAINTENANCE_ROUTES },
		{path: 'message', component: MessageComponent, children: MESSAGE_ROUTES},
		{path: 'profile', component: ProfileSettingsComponent}
	]}
]
@NgModule({
	imports: [
		RouterModule.forChild(systemRoutes)
	],
	exports: [
		RouterModule
	]
})


export class SystemRoutesModule {}