import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listSlice'
})
export class ListSlicePipe implements PipeTransform {

  transform(value: any[], len: number): any {
     return value.slice(0,len);
  }

}
