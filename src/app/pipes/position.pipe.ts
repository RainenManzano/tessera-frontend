import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'positionFilter'
})

export class PositionPipe implements PipeTransform {

	transform(positions: any, department) {
		const resultArray = [];
		if(positions) {
			if(department === undefined) {
				return positions;	
			}

			for(const position of positions) {
				if(position.Department_Id == department) 
					resultArray.push(position)
			}
			return resultArray;
		}
		

	}

}