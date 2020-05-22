export class User {

	constructor(public User_Id, public Employee_Id: string, 
				public Lastname: string,public Firstname: string, public Middlename: string, 
				public Company_Email: string,
				public Department_Id: number, public Name: string, public Position_Id: number, 
				public Position_Name: string, public Username: string,
				public Role: number, public Status: number, public Type: string) {}

}