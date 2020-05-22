import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'roleFilter'
})

export class RolePipe implements PipeTransform {

	transform(element: any) {
		if(element==0) {
			return "Admin";
		} else if(element==1) {
			return "IT Head";
		} else if(element==2) {
			return "IT Staff";
		} else if(element==3) {
			return "Employee";
		}
	}

}