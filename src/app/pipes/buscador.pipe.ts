import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(value: any, nombre: string): any {
    if (nombre === undefined) {
      return value;
    } else {
      const name = nombre.toLowerCase();
      return value.filter(el => el.nombre.toLowerCase().indexOf(name) !== -1);
    }
  }
}
