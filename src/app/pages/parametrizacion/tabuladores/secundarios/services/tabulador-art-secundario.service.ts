import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { AppSettingsService }     from '../../../../../app-settings.service';
import { Observable }     from 'rxjs/Observable';
import { List } from 'immutable';
import 'rxjs/add/operator/catch';
import { TabuladorEquivalente } from '../../../../core/beans/tabulador-equivalente';
import { DetalleTabuladorEquivalente } from '../beans/detalle-tabulador-equivalente';
import { TabuladorPrincipal } from '../../../../core/beans/tabulador-principal';
import { Tabulador } from '../../../../core/beans/tabulador';

@Injectable()
export class TabuladorArtSecundarioService {

  urlTabulador: string = "";

  constructor(private http:Http,
              private context:AppSettingsService) {
  	this.urlTabulador = this.context.getServiceHostName() + "tabulador";   
  }

  getTabuladoresEquivalentes(): Observable<List<TabuladorEquivalente>>{
    console.log("getTabuladoresEquivalentes()");
    
    let url = this.urlTabulador + "/getTabuladoresEquivalentes";
    console.log("getTabuladoresEquivalentes() - url: " + url);
    
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');
    
    return this.http.get(url, {'headers': headers})
                  .map(this.parseListadoTabuladoresEquivalentes)
                  .catch(this.handleError);
  }

  private parseListadoTabuladoresEquivalentes(res: Response) {
    console.log("parseListadoTabuladoresEquivalentes - va a parsear los datos recibidos");    

    let body = res.json();
    let tabuladoresEquivalentes = List<TabuladorEquivalente>();
    for (var tabuladorEquivalente of body) {
      var item = new TabuladorEquivalente(tabuladorEquivalente); 
      tabuladoresEquivalentes = tabuladoresEquivalentes.push(item);
    }

    console.log("Tabuladores Equivalentes: " + tabuladoresEquivalentes);
    return tabuladoresEquivalentes;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  eliminarTabuladorEquivalente(idTabulador:number){
    console.log("eliminarTabuladorEquivalente()");

    let url = this.urlTabulador + "/eliminarTabuladorEquivalente";
    console.log("eliminarTabuladorEquivalente() - url: " + url);

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');

    console.log("eliminarTabuladorEquivalente() - headers: " + headers);

    let params: URLSearchParams = new URLSearchParams();
    let id = idTabulador + "";
    params.set('id', id);

    console.log("eliminarTabuladorEquivalente() - params: " + params);

    let options = new RequestOptions({ headers: headers ,  search: params });

    console.log("eliminarTabuladorEquivalente() - options: " + options);
    
    return this.http.delete(url, options)
                  .map(this.parseListadoTabuladoresEquivalentes)
                  .catch(this.handleError);
  }

  getDetalleTabuladorEquivalente(codigoErpRubro:string, codigoErpSubrubro:string, 
          codigoErpCaracteristicaA:string, codigoErpCaracteristicaB:string,
          esEdicion: boolean): 
          Observable<DetalleTabuladorEquivalente> {
    console.log("getTabuladorEquivalente()");

    let url = this.urlTabulador + "/getDetalleTabuladorEquivalente";
    console.log("getDetalleTabuladorEquivalente() - url: " + url);

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');

    console.log("getDetalleTabuladorEquivalente() - headers: " + headers);

    let params: URLSearchParams = new URLSearchParams();
    params.set('codigoErpRubro', codigoErpRubro);
    params.set('codigoErpSubrubro', codigoErpSubrubro);
    params.set('codigoErpCaracteristicaA', codigoErpCaracteristicaA);
    params.set('codigoErpCaracteristicaB', codigoErpCaracteristicaB);
    let edita = esEdicion + "";
    params.set('esEdicion', edita);

    console.log("getDetalleTabuladorEquivalente() - params: " + params);

    let options = new RequestOptions({ headers: headers ,  search: params });

    console.log("getDetalleTabuladorEquivalente() - options: " + options);
    
    return this.http.get(url, options)
                  .map(this.parseDetalleTabuladorEquivalente)
                  .catch(this.handleError);
  }

  private parseDetalleTabuladorEquivalente(res: Response) {
    console.log("parseDetalleTabuladorEquivalente - va a parsear los datos recibidos");    

    let body = res.json();

    console.log("parseDetalleTabuladorEquivalente - JSON: " + body);

    let detalleTabuladorEquivalente = new DetalleTabuladorEquivalente(body);    

    console.log("Detalle Tabulador Equivalente: " + detalleTabuladorEquivalente);
    return detalleTabuladorEquivalente;
  }

  guardarTabuladorEquivalente(tabuladores: List<Tabulador>, 
          tabuladorEquivalente: TabuladorEquivalente,
          tabuladorPrincipal: TabuladorPrincipal){
    
    let url = this.urlTabulador + "/guardarTabuladorEquivalente";
    console.log("guardarTabuladorEquivalente() - url: " + url);

    var tabuladoresOk = [];
    for (var i = 0; i < tabuladores.size; i++) {
      var tabulador = tabuladores.get(i);
      var posicion = i + 1;
      tabuladoresOk.push({ 'id' : tabulador.getId(), 'descripcion' : tabulador.getDescripcion(), 
        'tipoTabulador' : tabulador.getTipoTabulador(), 'codigoerpFamilia' : tabulador.getCodigoerpFamilia(),         
        'posicion' : posicion });
    }

    var idTabuladorPrincipalOk = tabuladorPrincipal.getId();

    var idTabuladorEquivalenteOk = -1;
    if(tabuladorEquivalente != null && tabuladorEquivalente.size() != 0){
      idTabuladorEquivalenteOk = tabuladorEquivalente.getId();
    }

    let body = JSON.stringify({idTabuladorPrincipal: idTabuladorPrincipalOk, 
          idTabuladorEquivalente: idTabuladorEquivalenteOk,
          tabuladoresSeleccionados: tabuladoresOk
       });
    console.log("guardarTabuladorEquivalente() - body: " + body);

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');
    let options = new RequestOptions({ headers: headers });

    console.log("guardarTabuladorEquivalente() - headers: " + headers);

    return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  private extractData(res: Response) {
    //let body = res.json();
    //return body || { };
    return { };
  }

  getTabuladorEquivalente(codigoErpTabEquivalente){
    console.log("getTabuladorEquivalente()");

    let url = this.urlTabulador + "/getTabuladorEquivalente";
    console.log("getTabuladorEquivalente() - url: " + url);

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');

    console.log("getTabuladorEquivalente() - headers: " + headers);

    let params: URLSearchParams = new URLSearchParams();
    params.set('codigoErp', codigoErpTabEquivalente);
  
    console.log("getTabuladorEquivalente() - params: " + params);

    let options = new RequestOptions({ headers: headers ,  search: params });

    console.log("getTabuladorEquivalente() - options: " + options);
    
    return this.http.get(url, options)
                  .map(this.parseTabuladorEquivalente)
                  .catch(this.handleError);
  }

  private parseTabuladorEquivalente(res: Response) {
    console.log("parseTabuladorEquivalente - va a parsear los datos recibidos");    

    let body = res.json();

    console.log("parseTabuladorEquivalente - JSON: " + body);

    let tabuladorEquivalente = new TabuladorEquivalente(body);    

    console.log("Tabulador Equivalente: " + tabuladorEquivalente);
    return tabuladorEquivalente;
  }
}
