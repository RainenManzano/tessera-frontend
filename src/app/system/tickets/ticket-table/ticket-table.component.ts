import { Component, ViewChild, OnInit, OnDestroy, Inject, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, timeInterval } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TicketService } from './../../../services/ticket.service';

import { Ticket } from './../../../models/ticket.model';

import { TicketAddComponent } from './../ticket-add/ticket-add.component';

@Component({
  selector: 'ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['ticket-table.component.css']
})

export class TicketTableComponent implements OnInit, OnDestroy {
  role: number;
  title: string;
  ticketType: string;
  listOfStatus: string[] = [ 'All', 'Open', 'Closed', 'Pending', 'Assigned', 'Resolved', 'Requests' ];
  refresh: Subscription;
  
  activeStatus: string = "All";
  searchString: string = "";
  dataSource = new MatTableDataSource<Ticket>();
  ticketsObservable: Observable<any>;
  searchObserver;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private ticketService: TicketService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) {}

  ngOnInit() {
    const refreshInterval = interval(1000);
    this.refresh = refreshInterval.pipe(timeInterval()).subscribe(() => {
      this.ticketService.reloadTickets(this.ticketType).subscribe( (tickets: Ticket[]) => {
        this.ticketService.tickets = tickets;
        this.setDataInTable(this.ticketService.getFilteredTickets(this.activeStatus, this.searchString));
      }, error => console.log(error) )
    }, error => console.log(error));
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.activeStatus = "All";
        this.ticketType = queryParams.type;
        if(this.ticketType=="view-all-tickets") {
          this.title = "All Tickets";
        } else if(this.ticketType=="view-issued-tickets") {
          this.title = "All Issued Tickets"
        } else if(this.ticketType=="view-supported-tickets"){
          this.title = "All Supported Tickets"
        }
        this.ticketService.reloadTickets(this.ticketType).subscribe( (tickets: Ticket[]) => {
          this.ticketService.tickets = tickets;
          this.setDataInTable(this.ticketService.getFilteredTickets(this.activeStatus, this.searchString));
        }, error => console.log(error) )
      });
    this.ticketService.notification.subscribe( () => {
      this.ticketService.reloadTickets(this.ticketType).subscribe( (tickets: Ticket[]) => {
        this.ticketService.tickets = tickets;
        this.setDataInTable(this.ticketService.getFilteredTickets(this.activeStatus, this.searchString));
      });
    });
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  setDataInTable(ticketData) {
    this.dataSource.data = ticketData;
    this.dataSource.paginator = this.paginator;
    this.ticketsObservable = this.dataSource.connect();
  }

  colorCheck(status: string) {
    if(status == "Pending") 
      return "#de9309";
    else if(status == "Open")
      return "#4a64d5";
    else if(status == "Closed")
      return "#db3c3c";
    else if(status == "Assigned")
      return "#008000";
    else if(status == "Resolved")
      return "#8e4ec7";
    else if(status == "Denied")
      return "#c7864e";
  }

  onStatusChange(status) {
    // console.log(status)
    this.activeStatus = status;
    this.searchString = "";
    this.setDataInTable(this.ticketService.getFilteredTickets(this.activeStatus, this.searchString));
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(TicketAddComponent, {
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
      });
  }

  searchTicket(searchString: string) {
    if(!this.searchObserver) {
      Observable.create(observer => {
        this.searchObserver = observer
      })
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe( (searchString: string) => {
        this.searchString = searchString;
        this.setDataInTable(this.ticketService.getFilteredTickets(this.activeStatus, searchString));
      })
    }
    this.searchObserver.next(searchString);
  }







}