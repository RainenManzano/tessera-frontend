import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../../angular.material';

import { BioFormComponent } from './bio-form/bio-form.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { ProfileSettingsComponent } from './profile-settings.component';

@NgModule({
	declarations: [
		ProfileSettingsComponent,
		BioFormComponent,
		AccountFormComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AngularMaterialModule
	]
})

export class ProfileSettingsModule {
	
}