import { Map } from 'immutable';
import { UUID } from 'angular2-uuid';

export class Tabulador {

	/*
private long id;	
	private String descripcion;
	private String tipoTabulador;
	private String valor;
	private String unidad;
	private String codigoerpFamilia;
	private String nombreImagen;
	*/

	_data: Map<string, any>;

	constructor(data: any = undefined) {
		data = data || { id: -1, error: "Error", cost: 0, uuid: UUID.UUID() };
		this._data = Map<string, any>(data);
	}

	getId(){
		return <number> this._data.get('id');
	}

	getDescripcion(){
		return <string> this._data.get('descripcion');
	}

	getTipoTabulador(){
		return <string> this._data.get('tipoTabulador');
	}

	getCodigoerpFamilia(){
		return <string> this._data.get('codigoerpFamilia');
	}
}
