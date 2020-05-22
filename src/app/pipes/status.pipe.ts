import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'statusFilter'
})

export class StatusPipe implements PipeTransform {

	transform(element: any) {
		if(element==0) {
			return "Inactive";
		} else if(element==1) {
			return "Active";
		}
	}

}