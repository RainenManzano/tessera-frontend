import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'categoryIssueFilter'
})

export class CategoryIssuePipe implements PipeTransform {

	transform(issues: any, category) {
		const resultArray = [];
		if(issues) {
			if(category === undefined) {
				return issues;	
			}

			for(const issue of issues) {
				if(issue.Category_Id == category) 
					resultArray.push(issue)
			}
			return resultArray;
		}
		

	}

}