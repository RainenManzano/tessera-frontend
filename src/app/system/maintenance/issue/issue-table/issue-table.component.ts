import { Component, ViewChild, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { IssueService } from './../../../../services/issue.service';
import { Issue } from './../../../../models/issue.model';

import { IssueAddComponent } from './../issue-add/issue-add.component';

@Component({
  selector: 'issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['issue-table.component.css']
})

export class IssueTableComponent implements OnInit, OnDestroy {
  refresh: Subscription;
  issueData: Issue[];
  displayedColumns: string[] = ['Issue_Id', 'Issue', 'Description', 'Name', 'Level'];
  dataSource = new MatTableDataSource<Issue>(this.issueData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _issueService: IssueService,
                  private router: Router,
                  private route: ActivatedRoute,
                  public dialog: MatDialog) {}

  ngOnInit() {
    const refreshInterval = interval(5000);
    this.refresh = refreshInterval.pipe().subscribe(() => {
      this._issueService.getAllIssue().subscribe((data: Issue[]) => {
        this.updateIssues(data);
      }, error => console.log(error))
    });
    this._issueService.getAllIssue().subscribe((data: Issue[]) => {
      // console.log(data);
      this.updateIssues(data);
    }, error => console.log(error))
    this._issueService.notification.subscribe(() => {
      this._issueService.getAllIssue().subscribe((data: Issue[]) => {
        this.updateIssues(data);
      }, error => console.log(error))
    });
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  updateIssues(data) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(searchString) {
    this.dataSource.filter = searchString.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(IssueAddComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }








}