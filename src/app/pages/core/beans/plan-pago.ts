import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';

export class PlanPago {
/*
	private long id;
	private int cantidadCuotas;
	private String descripcion;
	private String codigoErp;
	private String textoLegal;
	private double porcentajeInteresSimple;*/

	_data: Map<string, any>;

	constructor(data: any = undefined) {
		data = data || { id: -1, error: "Error", cost: 0, uuid: UUID.UUID() };
		this._data = Map<string, any>(data);
	}

	getId(){
		return <number> this._data.get('id');
	}

	getCantidadCuotas(){
		return <number> this._data.get('cantidadCuotas');
	}

	getDescripcion(){
		return <string> this._data.get('descripcion');
	}

	getCodigoErp(){
		return <string> this._data.get('codigoErp');
	}

	getTextoLegal(){
		return <string> this._data.get('textoLegal');	
	}
}
