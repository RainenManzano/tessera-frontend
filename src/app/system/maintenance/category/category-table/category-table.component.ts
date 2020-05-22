import { Component, ViewChild, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { CategoryService } from './../../../../services/category.service';
import { Category } from './../../../../models/category.model';

import { CategoryAddComponent } from './../category-add/category-add.component';

@Component({
  selector: 'category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['category-table.component.css']
})

export class CategoryTableComponent implements OnInit, OnDestroy {
  refresh: Subscription;
  categoryData: Category[];
  displayedColumns: string[] = ['Category_Id', 'Name', 'Description'];
  dataSource = new MatTableDataSource<Category>(this.categoryData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private categoryService: CategoryService,
                  private router: Router,
                  private route: ActivatedRoute,
                  public dialog: MatDialog) {}

  ngOnInit() {
    const refreshInterval = interval(5000);
    this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
      this.categoryService.getAllCategory().subscribe((data: Category[]) => {
        this.updateCategories(data);
      },error => console.log(error));
    });
    this.categoryService.getAllCategory().subscribe((data: Category[]) => {
      this.updateCategories(data);
    },error => console.log(error));
    this.categoryService.notification.subscribe(() => {
      this.categoryService.getAllCategory().subscribe((data: Category[]) => {
        this.updateCategories(data);
      }, error => console.log(error));
    });
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  updateCategories(data) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(searchString) {
    this.dataSource.filter = searchString.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryAddComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }






}