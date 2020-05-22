import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { style, state, animate, transition, trigger } from '@angular/animations';

import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { ConfigurationService } from './../../services/configuration.service';

import { ProfilePicturesLocation } from './../locations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ 
        style({opacity:0}),
        animate(300, style({opacity:1})) 
      ]),
      transition(':leave', [  
        animate(300, style({opacity:0})) 
      ])
    ])
  ]
  
})
export class SidenavComponent implements OnInit {

  userInfo: any;
  userInfoImg: string;
  role: number;
  menus = []
  maintenanceTree = [
    {path:'maintenance/departments', title: 'Departments', icon: 'fas fa-circle-notch', class: 'maintain'},
    {path:'maintenance/positions', title: 'Positions', icon: 'fas fa-circle-notch', class: 'maintain'},
    {path:'maintenance/priorities', title: 'Priorities', icon: 'fas fa-circle-notch', class: 'maintain'},
    {path:'maintenance/categories', title: 'Categories', icon: 'fas fa-circle-notch', class: 'maintain'},
    {path:'maintenance/issues', title: 'Issues', icon: 'fas fa-circle-notch', class: 'maintain'},
    {path:'maintenance/support-preferences', title: 'Support Preferences', icon: 'fas fa-circle-notch', class: 'maintain'},
  ];
  maintenanceIsClicked: boolean = false;
  ticketIsClicked: boolean = false;

  constructor(private userService: UserService,
                    private authenticationService: AuthenticationService,
                    private _configurationService: ConfigurationService) { }

  ngOnInit() {
    this.userService.getLoggedInUser().subscribe((userInfo) => {
      // console.log(userInfo);
      this.userInfo = userInfo[0];
      this.userInfoImg = ProfilePicturesLocation + this.userInfo.Img_Name;
      this.role = this.userInfo.Role;
      if(this.role==0) {
        this.menus.push({path: 'user-management', title: 'User Management', icon: 'fas fa-users-cog', class: 'icon-dark-blue'});
        this.menus.push({path: 'reports', title: 'Reports', icon: 'fas fa-chart-bar', class: 'icon-orange'});
      } else if(this.role==1) {
        this.menus.push({path: 'reports', title: 'Reports', icon: 'fas fa-chart-bar', class: 'icon-orange'});
      }
    }, error => console.log(error));
    this.userService.imageChanged.subscribe((newFilename) => {
      this.userInfoImg = ProfilePicturesLocation + newFilename
    }, error => console.log(error));
    this.userService.bioChanged.subscribe(() => {
      this.userService.getLoggedInUser().subscribe( (userInfo) => {
          this.userInfo = userInfo[0];
        }, error => console.log(error));
    }, error => console.log(error));
  }

  backupDatabase() {
    this._configurationService.backupDatabase();
  }



}
