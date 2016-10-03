import { Map } from 'immutable';
import { UUID } from 'angular2-uuid';
import { TabuladorPrincipal } from '../../../../core/beans/tabulador-principal';
import { TabuladorEquivalente } from '../../../../core/beans/tabulador-equivalente';

export class DetalleTabuladorEquivalente {

	/*

	private TabuladorPrincipal tabuladorPrincipal;
	private TabuladorEquivalente tabuladorEquivalente;

	*/

	_data: Map<string, any>;

	constructor(data: any = undefined) {
		data = data || {  };
		this._data = Map<string, any>(data);
	}

	getTabuladorPrincipal(){
		let dataTabuladores = this._data.get("tabuladorPrincipal");
		var tabuladorPrincipal = new TabuladorPrincipal(dataTabuladores);

	    console.log("Tabulador Principal: " + tabuladorPrincipal);
	    return tabuladorPrincipal;
	}

	getTabuladorEquivalente(){
		let dataTabuladores = this._data.get("tabuladorEquivalente");
		var tabuladorEquivalente = new TabuladorEquivalente(dataTabuladores);

	    console.log("Tabulador Equivalente: " + tabuladorEquivalente);
	    return tabuladorEquivalente;
	}

	isYaCreado(){
		return <boolean> this._data.get("yaCreado");
	}
}
