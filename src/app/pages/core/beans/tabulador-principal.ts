import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';
import { TabuladorItem } from './tabulador-item';
import { Tabulador } from './tabulador';

export class TabuladorPrincipal {

	/*
long id
private String identificacion;
private String codigoErpRubro;
	private String descripcionRubro;
	private String codigoErpSubrubro;
	private String descripcionSubrubro;
	private String codigoErpCaracteristicaA;
	private String codigoErpCaracteristicaB; 
	private List<TabuladorItem> tabuladoresItems;

	*/

	_data: Map<string, any>;

	constructor(data: any = undefined) {
		data = data || { };
		this._data = Map<string, any>(data);
	}

	size(){
		return <number> this._data.size;
	}

	getId(){
		return <number> this._data.get('id');
	}

	getCodigoErp(){
		return <string> this._data.get('codigoErp');
	}
	
	getCodigoErpRubro(){
		return <string> this._data.get('codigoErpRubro');
	}

	getDescripcionRubro(){
		return <string> this._data.get('descripcionRubro');
	}

	getCodigoErpSubrubro(){
		return <string> this._data.get('codigoErpSubrubro');
	}

	getDescripcionSubrubro(){
		return <string> this._data.get('descripcionSubrubro');
	}

	getCodigoErpCaracteristicaA(){
		return <string> this._data.get('codigoErpCaracteristicaA');
	}

	getDescripcionCaracteristicaA(){
		return <string> this._data.get('descripcionCaracteristicaA');
	}

	getCodigoErpCaracteristicaB(){
		return <string> this._data.get('codigoErpCaracteristicaB');
	}

	getDescripcionCaracteristicaB(){
		return <string> this._data.get('descripcionCaracteristicaB');
	}

	getTabuladoresItems(){
		let dataTabItems = this._data.get("tabuladoresItems");
	    let tabuladoresItems = List<TabuladorItem>();
	    for (var tabuladorItem of dataTabItems) {
	      var item = new TabuladorItem(tabuladorItem);
	      tabuladoresItems = tabuladoresItems.push(item);
	    }

	    console.log("Tabuladores Items: " + tabuladoresItems);
	    return tabuladoresItems;
	}

	getTabuladores(){
		let dataTab = this._data.get("tabuladores");
	    let tabuladores = List<Tabulador>();
	    for (var tabulador of dataTab) {
	      var item = new Tabulador(tabulador);
	      tabuladores = tabuladores.push(item);
	    }

	    console.log("Tabuladores: " + tabuladores);
	    return tabuladores;
	}
}
