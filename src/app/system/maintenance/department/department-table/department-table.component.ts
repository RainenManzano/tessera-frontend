import { Component, ViewChild, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DepartmentService } from './../../../../services/department.service';

import { Department } from './../../../../models/department.model';

import { DepartmentAddComponent } from './../department-add/department-add.component';

@Component({
  selector: 'department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['department-table.component.css']
})

export class DepartmentTableComponent implements OnInit, OnDestroy {

  departmentData: Department[];
  displayedColumns = ['Department_Id', 'Name','Description'];
  dataSource = new MatTableDataSource<Department>(this.departmentData);
  refresh: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private departmentService: DepartmentService,
                    private router: Router,
                    private route: ActivatedRoute,
                    public dialog: MatDialog) {}

  ngOnInit() {
    const refreshInterval = interval(5000);
    this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
      this.departmentService.getAllDepartment().subscribe((data: Department[]) => {
        this.updateDepartments(data);
      }, error => console.log(error));
    });
    this.departmentService.getAllDepartment().subscribe((data: Department[]) => {
      this.updateDepartments(data);
    }, error => console.log(error));
    this.departmentService.notification.subscribe(() => {
      this.departmentService.getAllDepartment().subscribe((data: Department[]) => {
        this.updateDepartments(data);
      }, error => console.log(error));
    });
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  updateDepartments(data) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(searchString) {
    this.dataSource.filter = searchString.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DepartmentAddComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }






}