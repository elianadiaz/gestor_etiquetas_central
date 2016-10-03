import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { AppSettingsService }     from '../../../../../app-settings.service';
import { Observable }     from 'rxjs/Observable';
import { List } from 'immutable';
import { CabeceraTabuladorPrincipal } from '../beans/cabecera-tabulador-principal';
import { DetalleTabuladorPrincipal } from '../beans/detalle-tabulador-principal';
import { Tabulador } from '../../../../core/beans/tabulador';
import 'rxjs/add/operator/catch';
import { TabuladorPrincipal } from '../../../../core/beans/tabulador-principal';

@Injectable()
export class ConfiguracionTabArtPrincipalService {
  
  urlTabulador: string = "";

  constructor(private http:Http,
              private context:AppSettingsService) {
  	this.urlTabulador = this.context.getServiceHostName() + "tabulador";   
  }

  getCabeceraTabuladorPrincipal(): Observable<CabeceraTabuladorPrincipal> {
	  console.log("getCabeceraTabuladorPrincipal()");
    
    let url = this.urlTabulador + "/getCabeceraTabuladorPrincipal";
    console.log("getCabeceraTabuladorPrincipal() - url: " + url);
    
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');
    
  	return this.http.get(url, {'headers': headers})
                  .map(this.parseTabuladorPrincipal)
                  .catch(this.handleError);
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  private parseTabuladorPrincipal(res: Response) {
    console.log("parseTabuladorPrincipal - va a parsear los datos recibidos: " + res);    
    let body = res.json();
    let cabeceraTabuladorPrincipal = new CabeceraTabuladorPrincipal(body);
    
    console.log("CabeceraTabuladorPrincipal: " + cabeceraTabuladorPrincipal);
    return cabeceraTabuladorPrincipal;
  }

  getDetalleTabuladorPrincipal(codigoErpRubro:string, codigoErpSubrubro:string, 
          codigoErpCaracteristicaA:string, codigoErpCaracteristicaB:string, esEdicion: boolean): 
          Observable<DetalleTabuladorPrincipal> {
    console.log("getDetalleTabuladorPrincipal()");

    let url = this.urlTabulador + "/getDetalleTabuladorPrincipal";
    console.log("getDetalleTabuladorPrincipal() - url: " + url);

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');

    console.log("getDetalleTabuladorPrincipal() - headers: " + headers);

    let params: URLSearchParams = new URLSearchParams();
    params.set('codigoErpRubro', codigoErpRubro);
    params.set('codigoErpSubrubro', codigoErpSubrubro);
    params.set('codigoErpCaracteristicaA', codigoErpCaracteristicaA);
    params.set('codigoErpCaracteristicaB', codigoErpCaracteristicaB);
    let esEdicionCadena = esEdicion + "";
    params.set('esEdicion', esEdicionCadena);

    console.log("getDetalleTabuladorPrincipal() - params: " + params);

    let options = new RequestOptions({ headers: headers ,  search: params });

    console.log("getDetalleTabuladorPrincipal() - options: " + options);
    
    return this.http.get(url, options)
                  .map(this.parseDetalleTabuladorPrincipal)
                  .catch(this.handleError);
  }

  private parseDetalleTabuladorPrincipal(res: Response) {
    console.log("parseDetalleTabuladorPrincipal - va a parsear los datos recibidos: " + res);    
    let body = res.json();
    let detalleTabuladorPrincipal = new DetalleTabuladorPrincipal(body);
    
    console.log("DetalleTabuladorPrincipal: " + detalleTabuladorPrincipal);
    return detalleTabuladorPrincipal;
  }

  guardarTabuladorPrincipal(codigoErpRubro:string, codigoErpSubrubro:string, 
          codigoErpCaracteristicaA:string, codigoErpCaracteristicaB:string,
          tabuladores: List<Tabulador>, descripcionRubro:string,
          descripcionSubrubro: string, descripcionCaracteristicaA:string,
          descripcionCaracteristicaB: string){    
    let url = this.urlTabulador + "/guardarTabuladorPrincipal";
    console.log("guardarTabuladorPrincipal() - url: " + url);

    var tabuladoresOk = [];

    for (var i = 0; i < tabuladores.size; i++) {
      var tabulador = tabuladores.get(i);
      var posicion = i + 1;
      tabuladoresOk.push({ 'id' : tabulador.getId(), 'descripcion' : tabulador.getDescripcion(), 
        'tipoTabulador' : tabulador.getTipoTabulador(), 
        'codigoerpFamilia' : tabulador.getCodigoerpFamilia(), 
        'posicion' : posicion });
    }

    let body = JSON.stringify({codigoErpRubro: codigoErpRubro, 
      codigoErpSubrubro: codigoErpSubrubro, codigoErpCaracteristicaA: codigoErpCaracteristicaA, 
      codigoErpCaracteristicaB: codigoErpCaracteristicaB, descripcionRubro: descripcionRubro, 
      descripcionSubrubro: descripcionSubrubro, descripcionCaracteristicaA: descripcionCaracteristicaA,
      descripcionCaracteristicaB: descripcionCaracteristicaB, tabuladores: tabuladoresOk });
    console.log("guardarTabuladorPrincipal() - body: " + body);

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');
    let options = new RequestOptions({ headers: headers });

    console.log("guardarTabuladorPrincipal() - headers: " + headers);

    return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  private extractData(res: Response) {
    //let body = res.json();
    //return body || { };
    return { };
  }

  getTabuladoresPrincipales(): Observable<List<TabuladorPrincipal>>{
    console.log("getTabuladoresPrincipales()");
    
    let url = this.urlTabulador + "/getTabuladoresPrincipales";
    console.log("getTabuladoresPrincipales() - url: " + url);
    
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');
    
    return this.http.get(url, {'headers': headers})
                  .map(this.parseListadoTabuladorPrincipal)
                  .catch(this.handleError);
  }

  private parseListadoTabuladorPrincipal(res: Response) {
    console.log("parseListadoTabuladorPrincipal - va a parsear los datos recibidos");    

    let body = res.json();
    let tabuladoresPrincipales = List<TabuladorPrincipal>();
    for (var tabuladorPrincipal of body) {
      var item = new TabuladorPrincipal(tabuladorPrincipal); 
      tabuladoresPrincipales = tabuladoresPrincipales.push(item);
    }

    console.log("Tabuladores Principales: " + tabuladoresPrincipales);
    return tabuladoresPrincipales;
  }

  eliminarTabuladorPrincipal(idTabulador:number){
    console.log("eliminarTabuladorPrincipal()");

    let url = this.urlTabulador + "/eliminarTabuladorPrincipal";
    console.log("eliminarTabuladorPrincipal() - url: " + url);

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');

    console.log("eliminarTabuladorPrincipal() - headers: " + headers);

    let params: URLSearchParams = new URLSearchParams();
    let id = idTabulador + "";
    params.set('id', id);

    console.log("eliminarTabuladorPrincipal() - params: " + params);

    let options = new RequestOptions({ headers: headers ,  search: params });

    console.log("eliminarTabuladorPrincipal() - options: " + options);
    
    return this.http.delete(url, options)
                  .map(this.parseListadoTabuladorPrincipal)
                  .catch(this.handleError);
  }

  getTabuladorPrincipal(idTabuladorPrincipal: string){
    console.log("getTabuladorPrincipal()");
    
    let url = this.urlTabulador + "/getTabuladorPrincipal";
    console.log("getTabuladorPrincipal() - url: " + url);
    
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');

    let params: URLSearchParams = new URLSearchParams();    
    params.set('id', idTabuladorPrincipal);

    console.log("getTabuladorPrincipal() - params: " + params);

    let options = new RequestOptions({ headers: headers ,  search: params });

    console.log("getTabuladorPrincipal() - options: " + options);
    
    return this.http.get(url, options)
                  .map(this.parseTabuladorPrincipalEditar)
                  .catch(this.handleError);
  }

  private parseTabuladorPrincipalEditar(res: Response) {
    console.log("parseTabuladorPrincipalEditar - va a parsear los datos recibidos");    

    let body = res.json();
    let tabuladorPrincipal = new TabuladorPrincipal(body);
    
    console.log("Tabulador Principal: " + tabuladorPrincipal);
    return tabuladorPrincipal;
  }
}
