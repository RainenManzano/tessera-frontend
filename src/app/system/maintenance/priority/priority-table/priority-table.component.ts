import { Component, ViewChild, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { PriorityService } from './../../../../services/priority.service';
import { Priority } from './../../../../models/priority.model';

import { PriorityAddComponent } from './../priority-add/priority-add.component';

@Component({
  selector: 'priority-table',
  templateUrl: './priority-table.component.html',
  styleUrls: ['priority-table.component.css']
})

export class PriorityTableComponent implements OnInit, OnDestroy {
  refresh: Subscription;
  priorityData: Priority[];
  displayedColumns: string[] = ['Level', 'Days', 'Label'];
  dataSource = new MatTableDataSource<Priority>(this.priorityData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private priorityService: PriorityService,
                    private router: Router,
                    private route: ActivatedRoute,
                    public dialog: MatDialog) {}

  ngOnInit() {
    const refreshInterval = interval(5000);
    this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
      this.priorityService.getAllPriority().subscribe((data: Priority[]) => {
        this.updatePriority(data);
      }, error => console.log(error));
    });
    this.priorityService.getAllPriority().subscribe((data: Priority[]) => {
      this.updatePriority(data);
    }, error => console.log(error));
    this.priorityService.notification.subscribe(() => {
      this.priorityService.getAllPriority().subscribe((data: Priority[]) => {
        this.updatePriority(data);
      }, error => console.log(error));
    })
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  updatePriority(data) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(searchString) {
    this.dataSource.filter = searchString.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PriorityAddComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }








}