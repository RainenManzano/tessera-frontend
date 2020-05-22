import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { WebsiteComponent } from './website.component';
import { WebsiteHomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const websiteRoutes: Routes = [
	{path: '', component: WebsiteComponent, children: [
		{path: '', redirectTo: '/login', pathMatch: 'full' },
		{path: 'home', component: WebsiteHomeComponent},
		{path: 'about', component: AboutComponent},
		{path: 'services', component: ServicesComponent},
		{path: 'contact-us', component: ContactUsComponent}
	]}
];

@NgModule({
	imports: [
		RouterModule.forChild(websiteRoutes)
	],
	exports: [RouterModule]
})

export class WebsiteRoutingModule {
	
}