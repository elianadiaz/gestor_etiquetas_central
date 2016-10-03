import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';

export class TabuladorItem {

	/*
	private long id;
	private String nombreImagen;
	private long idTabCaracteristicas;
	private long idTabTabulador;
	private long idTabUnidad;
	private int posicion;

	*/

	_data: Map<string, any>;

	constructor(data: any = undefined) {
		data = data || { id: -1, error: "Error", cost: 0, uuid: UUID.UUID() };
		this._data = Map<string, any>(data);
	}

	getId(){
		return <number> this._data.get('id');
	}

	getNombreImagen(){
		return <string> this._data.get('codigoErpRubro');
	}

	getIdTabCaracteristicas(){
		return <number> this._data.get('idTabCaracteristicas');
	}

	getIdTabTabulador(){
		return <number> this._data.get('idTabTabulador');
	}

	getIdTabUnidad(){
		return <number> this._data.get('idTabUnidad');
	}

	getPosicion(){
		return <number> this._data.get('posicion');
	}
}
