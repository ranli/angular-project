import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toList'
})
export class ToListPipe implements PipeTransform {

  transform(value: any, length: number) {
  		if(value === null) return null;
  		var res = [];
    	Object.keys(value).map(function(k){
    		res.push(value[k]);
    	});
    	return res.reverse();
   }

}
