export class Ticket {
	constructor(public Ticket_Id: number, public Issue: number, public Description: string, public Solution: string,
				public DateCreated:Date,public DateClosed: string, public DateModified: Date, 
				public HourCreated: number, public MinuteCreated: number,
				public HourClosed: string, public MinuteClosed: string,
				public CreatedBy: number, public Status: string, public Is_Reassign: number,
				public Reassignment_Reason: string, public Reopen_Reason: string,
					public CreatedLastname: string, public CreatedFirstname: string, public CreatedMiddlename: string, 
				public SupportedBy: number, 
					public SupportedLastname: string, public SupportedFirstname: string, public SupportedMiddlename: string,  public SupporterImage: string,
				public IssueName: string, public IssueDescription: string,
				public Category_Id: number, public Name: string, public CategoryDescription: string, 
				public Priority_Id: number, public Level: number, public Days: number, public Hours: number, public Minutes: number, public Label: string) {}
}