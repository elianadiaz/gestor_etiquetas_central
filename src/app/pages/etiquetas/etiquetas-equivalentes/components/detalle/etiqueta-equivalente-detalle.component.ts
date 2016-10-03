import { Component, OnInit } from '@angular/core';
import { List } from 'immutable';
import { Articulo } from '../../../../core/beans/articulo';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { EtiquetaEquivalenteDetalleService } from '../../services/etiqueta-equivalente-detalle.service';
import { FiltroCodigoArticuloPipe } from '../../../../core/pipes/filtro-codigo-articulo.pipe';
import { OrderArticuloByCodigoErpPipe } from '../../../../core/pipes/order-articulo-by-codigo-erp.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-etiqueta-equivalente-detalle',
  templateUrl: 'etiqueta-equivalente-detalle.component.html',
  styleUrls: ['etiqueta-equivalente-detalle.component.css'],
  directives: [
  	ROUTER_DIRECTIVES,
  ],
  providers: [
    EtiquetaEquivalenteDetalleService,    
  ],
  pipes: [
    FiltroCodigoArticuloPipe,
    OrderArticuloByCodigoErpPipe
  ]
})
export class EtiquetaEquivalenteDetalleComponent implements OnInit {

  errorMessage: string;
  articulos: List<Articulo>;
  codigoErpArticuloSeleccionado: string;
  seleccionoArticulo: boolean;
  detalleArticuloSeleccionado: string;
  rubroArticuloSeleccionado: string;
  subrubroArticuloSeleccionado: string;
  caracteristicaAArticuloSeleccionado: string;
  caracteristicaBArticuloSeleccionado: string;
  articuloPrincipal: Articulo;

  //TODO FALTA VER ESTO
  tienePosiblesArticulosEquivalentes: boolean;
  articulosEquivalentes: List<Articulo>;
  checkboxes: boolean[];
  articulosEquivalentesSeleccionados: List<Articulo>;
  checkboxesSeleccionados: boolean[];
  codigoArticuloBuscado: string;
  codigoArticuloBuscadoSeleccionado: string;

  constructor(private etiquetaEquivalenteDetalleService: EtiquetaEquivalenteDetalleService) {
    /*this.etiquetaEquivalenteDetalleService.getArticulos()
                          .subscribe(
                            articulos => this.articulos = articulos,
                            error => this.errorMessage = <any>error);*/
    this.tienePosiblesArticulosEquivalentes = false;
    this.articulosEquivalentes = List<Articulo>();
    this.checkboxes = [];
    this.articulosEquivalentesSeleccionados = List<Articulo>();
    this.checkboxesSeleccionados = [];

    //ESTO Q SIGUE ES DE PRUEBA:
    this.codigoErpArticuloSeleccionado = "020339";    
  }

  ngOnInit() {
  }

  onBuscarArticuloPrincipal(){
    this.etiquetaEquivalenteDetalleService.getArticulo(this.codigoErpArticuloSeleccionado)
                          .subscribe(
                            articulo => this.cargarArticuloPrincipal(articulo),
                            error => this.errorMessage = <any>error);
  }

  private cargarArticuloPrincipal(articulo: Articulo){
    this.articuloPrincipal = articulo;
    this.codigoErpArticuloSeleccionado = articulo.getCodigoErp();
    this.detalleArticuloSeleccionado = articulo.getDescripcion();
    this.rubroArticuloSeleccionado = articulo.getDescripcionRubro();
    this.subrubroArticuloSeleccionado = articulo.getDescripcionSubrubro();
    this.caracteristicaAArticuloSeleccionado = articulo.getDescripcionCaracteristicaA();
    this.caracteristicaBArticuloSeleccionado = articulo.getDescripcionCaracteristicaB();
    this.seleccionoArticulo = true;

    if(this.articuloPrincipal){
      if(this.articuloPrincipal.getPosiblesArticulosEquivalentes()){        
        this.articulosEquivalentes = this.articuloPrincipal.getPosiblesArticulosEquivalentes();
        
        if(this.articulosEquivalentes != null && this.articulosEquivalentes.size != 0){
          for (var i = 0; i < this.articulosEquivalentes.size; i++) {
            console.log("Articulo Equivalente - id: " + this.articulosEquivalentes.get(i).getId());
            this.checkboxes[this.articulosEquivalentes.get(i).getId()] = false;
          }

          this.tienePosiblesArticulosEquivalentes = true;
        }        
      } else {
        this.tienePosiblesArticulosEquivalentes = false;
        this.articulosEquivalentes = List<Articulo>();
        this.checkboxes = [];
        this.articulosEquivalentesSeleccionados = List<Articulo>();
        this.checkboxesSeleccionados = [];
      }
    }
  }

  onQuitarTodos(){
    for (var index = 0; index < this.articulosEquivalentesSeleccionados.size; index++) {     
      var articuloEquivalente = this.articulosEquivalentesSeleccionados.get(index);      
      this.articulosEquivalentes = this.articulosEquivalentes.push(articuloEquivalente);
    }

    this.articulosEquivalentesSeleccionados = List<Articulo>();
    this.checkboxesSeleccionados = [];

    //checkboxes y tabuladores
    for (var i = 0; i < this.articulosEquivalentes.size; i++) {
      console.log("Articulos Equivalente - id: " + this.articulosEquivalentes.get(i).getId());
      this.checkboxes[this.articulosEquivalentes.get(i).getId()] = false;
    }
  }

  onQuitar(){
    console.log("Checkboxes seleccionados: " + this.checkboxesSeleccionados);
    console.log("Length de checkboxes seleccionados: " + this.checkboxesSeleccionados.length);
    var checkboxesAux:boolean[];
    var articulosEquivalentesASacar: number[] = [];
    var k = 0;
    for (var i = 0; i < this.checkboxesSeleccionados.length; i++) {    
      console.log("Checkboxes seleccionados en posicion " + i + " contiene : " + this.checkboxesSeleccionados[i]);

      if(this.checkboxesSeleccionados[i] == true){
        //Este seria el valor del getId() = i
        for (var j = this.articulosEquivalentesSeleccionados.size - 1; j >= 0; j--) {
          if(this.articulosEquivalentesSeleccionados.get(j).getId() == i){
            //El index seria j
            articulosEquivalentesASacar[k] = j;
            k++;
          }
        }        
      }
    }

    var indexTabuladoresASacar: number[];
    for (var i = articulosEquivalentesASacar.length - 1; i >= 0; i--) {
      var index = articulosEquivalentesASacar[i];
      var articuloEquivalente = this.articulosEquivalentesSeleccionados.get(index);
      this.articulosEquivalentesSeleccionados = this.articulosEquivalentesSeleccionados.remove(index);

      this.articulosEquivalentes = this.articulosEquivalentes.push(articuloEquivalente);
    }

    for (var i = 0; i < this.articulosEquivalentesSeleccionados.size; i++) {
      console.log("Articulo Equivalente Seleccionado - id: " + this.articulosEquivalentesSeleccionados.get(i).getId());
      this.checkboxesSeleccionados[this.articulosEquivalentesSeleccionados.get(i).getId()] = false;
    }

    //checkboxes y tabuladores
    for (var i = 0; i < this.articulosEquivalentes.size; i++) {
      console.log("Articulo Equivalente - id: " + this.articulosEquivalentes.get(i).getId());
      this.checkboxes[this.articulosEquivalentes.get(i).getId()] = false;
    }
  }

  onAgregar(){
    console.log("Checkboxes: " + this.checkboxes);
    console.log("Length de checkboxes: " + this.checkboxes.length);
    var checkboxesAux:boolean[];
    var articulosEquivalentesASacar: number[] = [];
    var k = 0;
    for (var i = 0; i < this.checkboxes.length; i++) {    
      console.log("Checkboxes en posicion " + i + " contiene : " + this.checkboxes[i]);

      if(this.checkboxes[i] == true){
        //Este seria el valor del getId() = i
        for (var j = 0; j < this.articulosEquivalentes.size; j++) {
          if(this.articulosEquivalentes.get(j).getId() == i){
            //El index seria j
            articulosEquivalentesASacar[k] = j;
            k++;
          }
        }        
      }
    }

    var indexTabuladoresASacar: number[];
    for (var i = articulosEquivalentesASacar.length - 1; i >= 0; i--) {
      var index = articulosEquivalentesASacar[i];
      var articuloEquivalente = this.articulosEquivalentes.get(index);
      this.articulosEquivalentes = this.articulosEquivalentes.remove(index);
      this.articulosEquivalentesSeleccionados = this.articulosEquivalentesSeleccionados.push(articuloEquivalente);      
    }

    for (var i = 0; i < this.articulosEquivalentes.size; i++) {
      console.log("Articulo Equivalente - id: " + this.articulosEquivalentes.get(i).getId());
      this.checkboxes[this.articulosEquivalentes.get(i).getId()] = false;
    }

    for (var i = 0; i < this.articulosEquivalentesSeleccionados.size; i++) {
      console.log("Articulo Equivalente Seleccionado - id: " + this.articulosEquivalentesSeleccionados.get(i).getId());
      this.checkboxesSeleccionados[this.articulosEquivalentesSeleccionados.get(i).getId()] = false;
    }
  }

  onGuardarEtiquetaEquivalente(){

  }

  onPrevisualizarEtiquetaEquivalente(){

  }
}
