import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

import { TicketService } from './../../../services/ticket.service';

@Component({
  selector: 'dashboard-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css']
})

export class AllTicketsDashboardComponent implements OnInit, AfterViewInit {
	
	public doughnutChartLabels: Label[] = ['Open', 'Closed', 'Assigned', 'Pending', 'Resolved'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public chartColors = [
    { 
      backgroundColor: ['#4e4b4e', '#a994a5', '#d0c9a6', '#8fb8b2', '#dbedf0'] 
    },
  ];

	constructor(private _ticketService: TicketService) { }

	ngOnInit() {
    this._ticketService.dashboardAllTickets.subscribe((totalTickets: any) => {
      console.log(totalTickets);
      this.doughnutChartData = [totalTickets.Open, totalTickets.Closed, totalTickets.Pending, totalTickets.Assigned, totalTickets.Resolved, ]
    }, error => console.log(error));
	}

  ngAfterViewInit() {
    this._ticketService.dashboardAllTickets.subscribe((totalTickets: any) => {
      console.log(totalTickets);
      this.doughnutChartData = [totalTickets.Open, totalTickets.Closed, totalTickets.Pending, totalTickets.Assigned, totalTickets.Resolved, ]
    }, error => console.log(error));
  }






}
