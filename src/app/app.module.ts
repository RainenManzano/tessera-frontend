import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { WebsiteModule } from './website/website.module';
import { SystemModule } from './system/system.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { SystemComponent } from './system/system.component';

import { AuthenticationService } from './services/authentication.service';
import { DepartmentService } from './services/department.service';
import { CategoryService } from './services/category.service';
import { IssueService } from './services/issue.service';
import { TicketService } from './services/ticket.service';
import { PositionService } from './services/position.service';
import { PriorityService } from './services/priority.service';
import { UserService } from './services/user.service';
import { ConfigurationService } from './services/configuration.service';
import { NotificationService } from './services/notification.service';
import { SupportPreferenceService } from './services/supportPreference.service';
import { MessageService } from './services/message.service';
import { TrailService } from './services/trail.service';
import { Validators } from './services/validators.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthenticationModule,
    WebsiteModule,
    SystemModule,
    SharedModule,
  ],
  providers: [
    AuthenticationService, 
    DepartmentService, 
    CategoryService,
    IssueService,
    TicketService,
    PositionService,
    PriorityService,
    UserService,
    ConfigurationService,
    SupportPreferenceService,
    MessageService,
    TrailService,
    Validators,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
