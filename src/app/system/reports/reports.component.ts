import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-reports',
	templateUrl: './reports.component.html',
	styleUrls: ['reports.component.css']
})

export class ReportsComponent implements OnInit {

	maintenanceOptions: boolean = false;
	ticketOptions: boolean = false;
	domain: string = "http://localhost/tessera-backend/api/AjaxCall/transacPDF.php?"
	requestLink: string;
	
	ngOnInit() {

	}

	onReportChange(type: string) {
		if(type=="Maintenance") {
			this.maintenanceOptions = true;
			this.ticketOptions = false;
		} else if(type=="Ticket") {
			this.ticketOptions = true;
			this.maintenanceOptions = false;
		}
	}

	onMaintenanceChange(maintenanceReport: string) {
		if(maintenanceReport=="Department") {
			this.requestLink = "type=departmentMaintenanceReport";
		} else if(maintenanceReport=="Position") {
			this.requestLink = "type=positionMaintenanceReport";
		} else if(maintenanceReport=="Priority") {
			this.requestLink = "type=priorityMaintenanceReport";
		} else if(maintenanceReport=="Category") {
			this.requestLink = "type=categoryMaintenanceReport";
		} else if(maintenanceReport=="Issue") {
			this.requestLink = "type=issueMaintenanceReport";
		} else if(maintenanceReport=="Support Preferences") {
			this.requestLink = "type=supportPreferenceMaintenanceReport";
		}
		console.log(this.requestLink);
	}

	onTicketChange(ticketReport: string) {
		if(ticketReport=="allTickets") {
			this.requestLink = "type=allTicketsReport";
		} else if(ticketReport=="Performance") {
			this.requestLink = "type=getPerformanceReport";
		} else if(ticketReport=="Summary") {
			this.requestLink = "type=getSummarySupported";
		} 
		console.log(this.requestLink);
	}

	generateReport() {
		window.open(this.domain + this.requestLink, "_blank");
	}








}