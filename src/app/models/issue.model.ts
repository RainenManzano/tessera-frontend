export class Issue {
	constructor(public Issue_Id: number, public Issue: string, public Description: string, 
		public Category_Id: number, public Name: string, public CategoryDescription: string,
		public Priority_Id:number, public Level: number, public Days: number, public Hours: number, public Minutes: number
		) {}
}