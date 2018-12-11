import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento'
})
export class DescuentoPipe implements PipeTransform {

  transform(value: any, todas: boolean): any {
    if(todas){
      return value;
    }else{
      return value.filter(el => el.oferta === true);
    }
  }

}
