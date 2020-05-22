import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { TicketService } from './../../../services/ticket.service';
import { AuthenticationService } from './../../../services/authentication.service';

@Component({
  selector: 'dashboard-supported-tickets',
  templateUrl: './supported-tickets.component.html',
  styleUrls: ['./supported-tickets.component.css']
})

export class SupportedTicketsDashboardComponent implements OnInit {

	public pieChartOptions: ChartOptions = {
    	responsive: true,
    	legend: {
      		position: 'top',
    	},
    	plugins: {
      		datalabels: {
        		formatter: (value, ctx) => {
          			const label = ctx.chart.data.labels[ctx.dataIndex];
          			return label;
        		},
      		},
    	}
  	};
  	public pieChartLabels: Label[] = [ 'Open', 'Closed', 'Pending', 'Assigned', 'Resolved'];
  	public pieChartData: number[] = [ 0, 0, 0, 0, 0];
  	public pieChartType: ChartType = 'pie';
  	public pieChartLegend = true;
  	public pieChartColors = [
    	{
    		backgroundColor: ['#a0d084', '#9cb2e3', '#d5d6da', '#b6add8', '#de556f'],
    	},
  	];

	constructor(private _ticketService: TicketService) { }

	ngOnInit() {

    this._ticketService.dashboardSupportedTickets.subscribe(
      (supportedTickets: any) => {
        this.pieChartData = [supportedTickets.Open, supportedTickets.Closed, supportedTickets.Pending, supportedTickets.Assigned, supportedTickets.Resolved, ]
      }, error => console.log(error)
    );

	}










}
