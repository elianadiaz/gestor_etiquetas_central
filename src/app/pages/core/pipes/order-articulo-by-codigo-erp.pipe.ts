import { Pipe, PipeTransform } from '@angular/core';
import { Articulo } from '../beans/articulo';

@Pipe({
  name: 'orderArticuloByCodigoErp'
})
export class OrderArticuloByCodigoErpPipe implements PipeTransform {

  /*transform(value: any, args?: any): any {
    return null;
  }*/

  transform(allArticulos: Array<Articulo>): Array<Articulo> {
  	allArticulos.sort((a: Articulo, b: Articulo) => {
      if (a.getCodigoErp() < b.getCodigoErp()) {
        return -1;
      } else if (a.getCodigoErp() > b.getCodigoErp()) {
        return 1;
      } else {
        return 0;
      }
    });
    return allArticulos;
  }

}
