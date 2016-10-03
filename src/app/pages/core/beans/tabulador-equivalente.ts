import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';
import { TabuladorItem } from './tabulador-item';
import { TabuladorPrincipal } from './tabulador-principal';
import { Tabulador } from './tabulador';

export class TabuladorEquivalente {
	/*
private long id;
	
	private String codigoErp;
	private TabuladorPrincipal tabuladorPrincipal;
	
	private List<TabuladorItem> tabuladoresItemsSeleccionados;
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

	getTabuladorPrincipal(){
		let dataTab = this._data.get("tabuladorPrincipal");
		return new TabuladorPrincipal(dataTab);
	}

	getTabuladoresItemsSeleccionados(){
		let dataTabItems = this._data.get("tabuladoresItemsSeleccionados");
	    let tabuladoresItems = List<TabuladorItem>();
	    for (var tabuladorItem of dataTabItems) {
	      var item = new TabuladorItem(tabuladorItem);
	      tabuladoresItems = tabuladoresItems.push(item);
	    }
	    console.log("Tabuladores Items Seleccionados: " + tabuladoresItems);
	    return tabuladoresItems;
	}

	getTabuladoresSeleccionados(){
		let dataTab = this._data.get("tabuladoresSeleccionados");
	    let tabuladores = List<Tabulador>();
	    for (var tabulador of dataTab) {
	      var item = new Tabulador(tabulador);
	      tabuladores = tabuladores.push(item);
	    }

	    console.log("Tabuladores: " + tabuladores);
	    return tabuladores;
	}
}
