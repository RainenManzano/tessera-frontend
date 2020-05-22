import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { TicketService } from './../../../services/ticket.service';

@Component({
  selector: 'dashboard-issued-tickets',
  templateUrl: './issued-tickets.component.html',
  styleUrls: ['./issued-tickets.component.css']
})

export class IssuedTicketsDashboardComponent implements OnInit {
	
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
    		backgroundColor: ['#bca49b', '#c0b19e', '#2f4751', '#a6bdb3', '#b78276'],
    	},
  	];

	constructor(private _ticketService: TicketService) { }

	ngOnInit() {

    this._ticketService.dashboardIssuedTickets.subscribe(
      (issuedTickets: any) => {
        this.pieChartData = [issuedTickets.Open, issuedTickets.Closed, issuedTickets.Pending, issuedTickets.Assigned, issuedTickets.Resolved, ]
      }, error => console.log(error)
    )

	}









  

}
