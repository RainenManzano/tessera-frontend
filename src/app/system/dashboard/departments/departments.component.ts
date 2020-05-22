import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { TicketService } from './../../../services/ticket.service';

@Component({
  selector: 'dashboard-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})

export class DepartmentsDashboardComponent implements OnInit {
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
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['#b0b0d8', '#7782c5', '#5959a0', '#43436e', '#e9e9f9', '#dbedf0', '#8fb8b2', '#d0c9a6', '#a994a5', '#4e4b4e', '#87d3b5', '#afe689', '#82de94', '#46cf76', '#53b332', '#f1f99d', '#c5ffe2', '#a8f7f4', '#c0d2ff', '#f7c79a', '#bca49b', '#c0b19e', '#2f4751', '#a6bdb3', '#b78276'],
    },
  ];

	constructor(private _ticketService: TicketService) { }

	ngOnInit() {
    
    this._ticketService.dashboardDepartmentTickets.subscribe((departments: any) => {
      // console.log(departments)
      this.pieChartLabels = departments[0];
      this.pieChartData = departments[1];
    }, error => console.log(error));

	}








}
