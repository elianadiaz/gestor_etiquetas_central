import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';
import { Familia } from '../../../../core/beans/familia';
import { PlanPago } from '../../../../core/beans/plan-pago';

export class CabeceraTabuladorPrincipal {
	_data: Map<string, any>;
	/*_data2: Map<string, any>;
	_data3: Map<string, any>;*/

	constructor(data: any = undefined) {
		data = data || { id: -1, error: "Error", cost: 0, uuid: UUID.UUID() };
		this._data = Map<string, any>(data);
	}

	getFamilias(){
		/*-familias
		let data2 = this._data.("familias") || { id: -1, name: "", address: 0, uuid: UUID.UUID() }
		this._data2 = Map<string, any>(data2);
*/

		let dataFamilias = this._data.get("familias");
	    let familias = List<Familia>();
	    for (var familia of dataFamilias) {
	      var item = new Familia(familia); 
	      familias = familias.push(item);
	    }
	    console.log("Familias: " + familias);
	    return familias;
	}

	getPlanesPago(){
		//planesPago
		let dataPlanesPago = this._data.get("planesPago");
	    let planesPago = List<PlanPago>();
	    for (var planPago of dataPlanesPago) {
	      var item = new PlanPago(planPago); 
	      planesPago = planesPago.push(item);
	    }
	    console.log("PlanesPago: " + planesPago);
	    return planesPago;
	}
}
