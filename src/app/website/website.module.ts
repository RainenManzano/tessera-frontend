import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from './../angular.material';
import { WebsiteRoutingModule } from './website-routing.module';

import { WebsiteComponent } from './website.component';
import { WebsiteHeaderComponent } from './header/header.component';
import { WebsiteHomeComponent } from './home/home.component';
import { WebsiteFooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServicesComponent } from './services/services.component';

@NgModule({
	declarations: [
		WebsiteComponent,
		WebsiteHeaderComponent,
		WebsiteHomeComponent,
		WebsiteFooterComponent,
		AboutComponent,
		ContactUsComponent,
		ServicesComponent
	],
	imports: [
		CommonModule,
		WebsiteRoutingModule,
		AngularMaterialModule
	]
})

export class WebsiteModule {

}