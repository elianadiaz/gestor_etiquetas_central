import { Pipe, PipeTransform } from '@angular/core';
import { Articulo } from '../beans/articulo';

@Pipe({
  name: 'filtroCodigoArticulo'
})
export class FiltroCodigoArticuloPipe implements PipeTransform {

  /*transform(value: any, args?: any): any {
    return null;
  }*/


  transform(allArticulos: Articulo[], codigoArticuloBuscado: string) {
  	if(codigoArticuloBuscado == null || codigoArticuloBuscado == ''){
  		return allArticulos.filter(articulo => true);
  	}


    return allArticulos.filter(articulo => ( articulo.getCodigoErp() == codigoArticuloBuscado ));
  }

}
