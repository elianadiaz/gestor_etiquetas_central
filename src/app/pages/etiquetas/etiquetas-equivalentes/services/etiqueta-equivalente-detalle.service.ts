import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { AppSettingsService }     from '../../../../app-settings.service';
import { Observable }     from 'rxjs/Observable';
import { List } from 'immutable';
import 'rxjs/add/operator/catch';
import { Articulo } from '../../../core/beans/articulo';

@Injectable()
export class EtiquetaEquivalenteDetalleService {

  urlTabulador: string = "";

  constructor(private http:Http,
              private context:AppSettingsService) {
  	this.urlTabulador = this.context.getServiceHostName() + "etiquetaEquivalente";   
  }

  getArticulos(): Observable<List<Articulo>>{
    console.log("getArticulos()");
    
    let url = this.urlTabulador + "/getArticulos";
    console.log("getArticulos() - url: " + url);
    
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');
    
    return this.http.get(url, {'headers': headers})
                  .map(this.parseListadoArticulos)
                  .catch(this.handleError);
  }

  private parseListadoArticulos(res: Response) {
    console.log("parseListadoArticulos - va a parsear los datos recibidos");    

    let body = res.json();
    let articulos = List<Articulo>();
    for (var articulo of body) {
      var item = new Articulo(articulo); 
      articulos = articulos.push(item);
    }

    console.log("Articulos: " + articulos);
    return articulos;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getArticulo(codigoErp: string): Observable<Articulo>{
    console.log("getArticulo()");
    
    let url = this.urlTabulador + "/getArticulo";
    console.log("getArticulo() - url: " + url);
    
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('charset','UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/');

    let params: URLSearchParams = new URLSearchParams();
    params.set('codigoErp', codigoErp);
    
    console.log("getArticulo() - params: " + params);

    let options = new RequestOptions({ headers: headers ,  search: params });

    console.log("getArticulo() - options: " + options);
    
    return this.http.get(url, options)
                  .map(this.parseArticulo)
                  .catch(this.handleError);
  }

  private parseArticulo(res: Response) {
    console.log("parseArticulo - va a parsear los datos recibidos");    

    let body = res.json();
    let articulo = new Articulo(body);
    
    console.log("Articulo: " + articulo);
    return articulo;
  }
}
