import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';

export class CaracteristicaB {
/*
private long id;
	private String codigoErp;
	private String codigoErpCaracteristicaB;
	private String descripcionCaracteristicaB;
	*/

	_data: Map<string, any>;

	constructor(data: any = undefined) {
		data = data || { id: -1, error: "Error", cost: 0, uuid: UUID.UUID() };
		this._data = Map<string, any>(data);
	}

	getId(){
		return <number> this._data.get('id');
	}

	getCodigoErp(){
		return <string> this._data.get('codigoErp');
	}

	getCodigoErpCaracteristicaB(){
		return <string> this._data.get('codigoErpCaracteristicaB');
	}

	getDescripcionCaracteristicaB(){
		return <string> this._data.get('descripcionCaracteristicaB');
	}
}
