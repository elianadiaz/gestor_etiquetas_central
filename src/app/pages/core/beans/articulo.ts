import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';


export class Articulo {

	_data: Map<string, any>;

	constructor(data: any = undefined) {
		data = data || { id: -1, error: "Error", cost: 0, uuid: UUID.UUID() };
		this._data = Map<string, any>(data);
	}

	/*
private long id;
	private String codigoErp;
	private String descripcion; 
	private long idFamiliapos;
	private String codigoErpFamilia;
	private String descripcionFamilia;
	private String codigoErpRubro;
	private String descripcionRubro;
	private String codigoErpSubrubro;
	private String descripcionSubrubro;
	private String codigoErpCaracteristicaA;
	private String descripcionCaracteristicaA;
	private String codigoErpCaracteristicaB;
	private String descripcionCaracteristicaB;
	*/

	getId(){
		return <number> this._data.get('id');
	}

	getCodigoErp(){
		//string
		return <string> this._data.get('codigoErp');
	}

	getDescripcion(){
		//string
		return <string> this._data.get('descripcion');
	}

	getDescripcionRubro(){
		//string
		return <string> this._data.get('descripcionRubro');
	}

	getDescripcionSubrubro(){
		//string
		return <string> this._data.get('descripcionSubrubro');
	}

	getDescripcionCaracteristicaA(){
		//string
		return <string> this._data.get('descripcionCaracteristicaA');
	}

	getDescripcionCaracteristicaB(){
		//string
		return <string> this._data.get('descripcionCaracteristicaB');	
	}

	getPosiblesArticulosEquivalentes(){
		let dataArtEquivalente = this._data.get("posiblesArticulosEquivalentes");
	    let articulosEquiv = List<Articulo>();
	    for (var articulo of dataArtEquivalente) {
	      var item = new Articulo(articulo); 
	      articulosEquiv = articulosEquiv.push(item);
	    }
	    console.log("Posibles Articulos Equivalentes: " + articulosEquiv);
	    return articulosEquiv;
	}	
}
