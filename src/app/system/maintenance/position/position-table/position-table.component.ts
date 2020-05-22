import { Component, ViewChild, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { PositionService } from './../../../../services/position.service';

import { Position } from './../../../../models/position.model';

import { PositionAddComponent } from './../position-add/position-add.component';

@Component({
  selector: 'position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['position-table.component.css']
})

export class PositionTableComponent implements OnInit, OnDestroy {
  refresh: Subscription;
  positionData: Position[];
  displayedColumns: string[] = ['Position_Id','Position_Name','Position_Desc','Department'];
  dataSource = new MatTableDataSource<Position>(this.positionData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private positionService: PositionService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog){}

  ngOnInit() {
    const refreshInterval = interval(5000);
    this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
      this.positionService.getAllPosition().subscribe((data: Position[]) => {
        this.updatePositions(data);
      }, error => console.log(error));
    })
    this.positionService.getAllPosition().subscribe((data: Position[]) => {
      this.updatePositions(data);
    }, error => console.log(error));
    this.positionService.notification.subscribe(() => {
      this.positionService.getAllPosition().subscribe((data: Position[]) => {
        this.updatePositions(data);
      }, error => console.log(error));
    }, error => console.log(error));  
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  updatePositions(data) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(searchString) {
    this.dataSource.filter = searchString.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PositionAddComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }













}