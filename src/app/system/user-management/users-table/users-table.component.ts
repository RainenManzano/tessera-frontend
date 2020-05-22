import { Component, ViewChild, OnInit, OnDestroy, Inject } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserService } from './../../../services/user.service';

import { User } from './../../../models/user.model';

import { UsersAddComponent } from './../users-add/users-add.component';
import { RegisterTypeComponent } from './../register-type/register-type.component';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['users-table.component.css']
})

export class UsersTableComponent implements OnInit, OnDestroy {
  refresh: Subscription;
  userData: User[];
  displayedColumns: string[] = ['User_Id', 'Lastname', 'Name', 'Position_Name', 'Role'];
  dataSource = new MatTableDataSource<User>(this.userData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService,
                    public dialog: MatDialog) {}

  ngOnInit() {
    const refreshInterval = interval(5000);
    this.refresh = refreshInterval.pipe(timeInterval()).subscribe( () => {
      this.userService.getAllUser().subscribe( (data: User[]) => {
        this.updateUsersData(data);
      }, error => console.log(error));
    }, error => console.log(error));
    this.userService.getAllUser().subscribe( (data: User[]) => {
      // console.log(data);
      this.updateUsersData(data);
    }, error => console.log(error));
    this.userService.notification.subscribe( () => {
      this.userService.getAllUser().subscribe( (data: User[]) => {
        this.updateUsersData(data);
      }, error => console.log(error));
    }, error => console.log(error));
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  updateUsersData(data) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(searchString) {
    this.dataSource.filter = searchString.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UsersAddComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterTypeComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }






}