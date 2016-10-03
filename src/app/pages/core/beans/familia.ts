import { List, Map } from 'immutable';
import { UUID } from 'angular2-uuid';
import { Subrubro } from './subrubro';

export class Familia {
/*private long id;
	private String codigoErp;
	private String codigoErpRubro;
	private String descripcionRubro;	
	private Set<Subrubro> subrubros;
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

	getCodigoErpRubro(){
		return <string> this._data.get('codigoErpRubro');
	}

	getDescripcionRubro(){
		return <string> this._data.get('descripcionRubro');
	}

	getSubrubros(){
		let dataSubrubros = this._data.get("subrubros");
	    let subrubros = List<Subrubro>();
	    for (var subrubro of dataSubrubros) {
	      var item = new Subrubro(subrubro); 
	      subrubros = subrubros.push(item);
	    }
	    console.log("Subrubros: " + subrubros);
	    return subrubros;
	}
}
