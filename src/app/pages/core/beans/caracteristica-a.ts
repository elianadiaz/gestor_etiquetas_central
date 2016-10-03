import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';
import { CaracteristicaB } from './caracteristica-b';

export class CaracteristicaA {
/*
private long id;
	private String codigoErp;
	private String codigoErpCaracteristicaA;
	private String descripcionCaracteristicaA;
	private Set<CaracteristicaB> caracteristicasB;*/

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

	getCodigoErpCaracteristicaA(){
		return <string> this._data.get('codigoErpCaracteristicaA');
	}

	getDescripcionCaracteristicaA(){
		return <string> this._data.get('descripcionCaracteristicaA');
	}

	getCaracteristicasB(){
		let dataCaractB = this._data.get("caracteristicasB");
	    let caracteristicasB = List<CaracteristicaB>();
	    for (var caracteristicaB of dataCaractB) {
	      var item = new CaracteristicaB(caracteristicaB); 
	      caracteristicasB = caracteristicasB.push(item);
	    }
	    console.log("CaracteristicasB: " + caracteristicasB);
	    return caracteristicasB;
	}
}
