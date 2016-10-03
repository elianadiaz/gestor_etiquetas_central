import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';
import { CaracteristicaA } from './caracteristica-a';

export class Subrubro {

	/*
	private long id;
	private String codigoErp;
	private String codigoErpSubrubro;
	private String descripcionSubrubro;
	private Set<CaracteristicaA> caracteristicasA;
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

	getCodigoErpSubrubro(){
		return <string> this._data.get('codigoErpSubrubro');
	}

	getDescripcionSubrubro(){
		return <string> this._data.get('descripcionSubrubro');
	}

	getCaracteristicasA(){
		let dataCaractA = this._data.get("caracteristicasA");
	    let caracteristicasA = List<CaracteristicaA>();
	    for (var caracteristicaA of dataCaractA) {
	      var item = new CaracteristicaA(caracteristicaA);
	      caracteristicasA = caracteristicasA.push(item);
	    }
	    console.log("CaracteristicasA: " + caracteristicasA);
	    return caracteristicasA;
	}
}
