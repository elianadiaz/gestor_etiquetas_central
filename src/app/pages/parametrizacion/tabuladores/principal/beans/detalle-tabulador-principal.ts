import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';
import { Tabulador } from '../../../../core/beans/tabulador';

export class DetalleTabuladorPrincipal {
	_data: Map<string, any>;

	constructor(data: any = undefined) {
		data = data || { id: -1, error: "Error", cost: 0, uuid: UUID.UUID() };
		this._data = Map<string, any>(data);
	}

	getTabuladores(){
		let dataTabuladores = this._data.get("tabuladores");
	    let tabuladores = List<Tabulador>();
	    for (var tabulador of dataTabuladores) {
	      var item = new Tabulador(tabulador); 
	      tabuladores = tabuladores.push(item);
	    }

	    console.log("Tabuladores: " + tabuladores);
	    return tabuladores;
	}

	isYaCreado(){
		return <boolean> this._data.get("yaCreado");
	}
}
