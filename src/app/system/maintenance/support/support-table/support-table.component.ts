import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { SupportPreferenceService } from './../../../../services/supportPreference.service';

@Component({
  selector: 'support-table',
  templateUrl: './support-table.component.html',
  styleUrls: ['support-table.component.css']
})

export class SupportTableComponent implements OnInit, OnDestroy {
  refresh: Subscription;
  supportData: any[];
  displayedColumns = ['User_Id', 'Lastname', 'Scope'];
  dataSource = new MatTableDataSource<any>(this.supportData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private preferenceService: SupportPreferenceService,
                  private router: Router,
                  private route: ActivatedRoute) {}

  ngOnInit() {
    const refreshInterval = interval(5000);
    this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
      this.preferenceService.getSupports().subscribe((data: any[]) => {
        this.updatePreferences(data);
      }, error => console.log(error));
    });
    this.preferenceService.getSupports().subscribe((data: any[]) => {
      this.updatePreferences(data);
    }, error => console.log(error));
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  updatePreferences(data) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(searchString) {
    this.dataSource.filter = searchString.trim().toLowerCase();
  }






}