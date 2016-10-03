import { Component, OnInit } from '@angular/core';
import { CabeceraTabuladorPrincipal } from '../../beans/cabecera-tabulador-principal';
import { DetalleTabuladorPrincipal } from '../../beans/detalle-tabulador-principal';
import { ConfiguracionTabArtPrincipalService } from '../../services/configuracion-tab-art-principal.service';
import { List } from 'immutable';
import { Familia } from '../../../../../core/beans/familia';
import { PlanPago } from '../../../../../core/beans/plan-pago';
import { Subrubro } from '../../../../../core/beans/subrubro';
import { CaracteristicaA } from '../../../../../core/beans/caracteristica-a';
import { CaracteristicaB } from '../../../../../core/beans/caracteristica-b';
import { Tabulador } from '../../../../../core/beans/tabulador';
import { TabuladorPrincipal } from '../../../../../core/beans/tabulador-principal';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { RouteParams, } from '@angular/router-deprecated';
import * as moment from 'moment';
moment().format();

@Component({
  moduleId: module.id,
  selector: 'app-tabulador-art-principal-detalle',
  templateUrl: 'tabulador-art-principal-detalle.component.html',
  styleUrls: ['tabulador-art-principal-detalle.component.css'],
  providers: [
    ConfiguracionTabArtPrincipalService,
  ],
  directives: [
    ROUTER_DIRECTIVES,
  ],
})

export class TabuladorArtPrincipalDetalleComponent implements OnInit {

  errorMessage: string;
  cabeceraTabuladorPrincipal : CabeceraTabuladorPrincipal;
  
  familias : List<Familia>;  
  rubro: Familia;
  codErpRubroSeleccionado: string;
  descripcionRubroSeleccionado: string;

  subrubros : List<Subrubro>;
  subrubro : Subrubro;
  codErpSubrubroSeleccionado: string;
  descripcionSubrubroSeleccionado: string;
  
  caracteristicasA : List<CaracteristicaA>;
  caracteristicaA : CaracteristicaA;
  codErpCaracteristicaASeleccionado: string;
  descripcionCaracteristicaASeleccionada: string;

  caracteristicasB : List<CaracteristicaB>;
  caracteristicaB : CaracteristicaB;
  codErpCaracteristicaBSeleccionado: string;
  descripcionCaracteristicaBSeleccionada: string;

  buscoTabuladores: boolean;
  detalleTabuladorPrincipal : DetalleTabuladorPrincipal;
  tabuladores : List<Tabulador>;
  tieneTabuladores : boolean;
  checkboxes:boolean[];

  tabuladoresSeleccionados : List<Tabulador>;
  checkboxesSeleccionados:boolean[];

  yaCreado: boolean;
  esEdicion: boolean;

  constructor(private confTabArtPrincipalService: ConfiguracionTabArtPrincipalService,
              private routeParams: RouteParams,
              private router: Router) {
  	this.buscoTabuladores = false;
    this.tieneTabuladores = false;
    this.codErpRubroSeleccionado = "00";
    this.descripcionRubroSeleccionado = "";
    this.codErpSubrubroSeleccionado = "00";
    this.descripcionSubrubroSeleccionado = "";
    this.codErpCaracteristicaASeleccionado = "00";
    this.descripcionCaracteristicaASeleccionada = "";
    this.codErpCaracteristicaBSeleccionado = "00";
    this.descripcionCaracteristicaBSeleccionada = "" ;
    this.checkboxes=[];
    this.tabuladoresSeleccionados = List<Tabulador>();
    this.checkboxesSeleccionados = [];
    this.yaCreado = false;
    this.esEdicion = false;    
  }

  ngOnInit() {
    if (this.routeParams.get('tabPrincipal') !== null) {
      let idTabuladorPrincipal = this.routeParams.get('tabPrincipal');
      this.onModoEdicion(idTabuladorPrincipal);
    } else {
      this.confTabArtPrincipalService.getCabeceraTabuladorPrincipal()
                          .subscribe(
                            cabeceraTabuladorPrincipal => this.cagarDatosIniciales(cabeceraTabuladorPrincipal),
                            error => this.errorMessage = <any>error);
    }
  }

  private onModoEdicion(idTabuladorPrincipal: string){
    this.confTabArtPrincipalService.getTabuladorPrincipal(idTabuladorPrincipal)
                          .subscribe(
                            tabuladorPrincipalEdicion => this.cargarTabuladorPrincipalEdicion(tabuladorPrincipalEdicion),
                            error => this.errorMessage = <any>error);
  }

  cargarTabuladorPrincipalEdicion(tabuladorPrincipal: TabuladorPrincipal){
    this.esEdicion = true;
    this.buscoTabuladores = true;
    this.tieneTabuladores = true;
    this.codErpRubroSeleccionado = tabuladorPrincipal.getCodigoErpRubro();
    this.descripcionRubroSeleccionado = tabuladorPrincipal.getDescripcionRubro();
    this.codErpSubrubroSeleccionado = tabuladorPrincipal.getCodigoErpSubrubro();
    this.descripcionSubrubroSeleccionado = tabuladorPrincipal.getDescripcionSubrubro();
    this.codErpCaracteristicaASeleccionado = tabuladorPrincipal.getCodigoErpCaracteristicaA();
    this.descripcionCaracteristicaASeleccionada = tabuladorPrincipal.getDescripcionCaracteristicaA();
    this.codErpCaracteristicaBSeleccionado = tabuladorPrincipal.getCodigoErpCaracteristicaB();
    this.descripcionCaracteristicaBSeleccionada = tabuladorPrincipal.getDescripcionCaracteristicaB();

    this.confTabArtPrincipalService.getDetalleTabuladorPrincipal(this.codErpRubroSeleccionado,
          this.codErpSubrubroSeleccionado, this.codErpCaracteristicaASeleccionado, 
          this.codErpCaracteristicaBSeleccionado, true)
                          .subscribe(
                            detalleTabuladorPrincipal => this.cagarDatosTabuladoresEditar(detalleTabuladorPrincipal, tabuladorPrincipal),
                            error => this.errorMessage = <any>error);
  }

  private cagarDatosTabuladoresEditar(detalleTabuladorPrincipal : DetalleTabuladorPrincipal, 
            tabuladorPrincipal: TabuladorPrincipal){
    this.detalleTabuladorPrincipal = detalleTabuladorPrincipal;
    if(this.detalleTabuladorPrincipal != null){ 
        this.yaCreado = false;       
        var tabuladoresOk = List<Tabulador>();
        if(tabuladorPrincipal.getTabuladores() != null && !tabuladorPrincipal.getTabuladores().isEmpty()){
            this.detalleTabuladorPrincipal.getTabuladores().forEach(function(item:Tabulador) {
            tabuladorPrincipal.getTabuladores().forEach(function(itemSeleccionado:Tabulador) {
              if(itemSeleccionado.getDescripcion() != item.getDescripcion()){
                tabuladoresOk = tabuladoresOk.push(item);  
              }            
            });       
          });  
        } else {
          tabuladoresOk = this.detalleTabuladorPrincipal.getTabuladores();
        }        

        this.tabuladores = tabuladoresOk;

        if(this.tabuladores != null && this.tabuladores.size != 0){
          for (var i = 0; i < this.tabuladores.size; i++) {
            console.log("Tabulador - id: " + this.tabuladores.get(i).getId());
            this.checkboxes[this.tabuladores.get(i).getId()] = false;
          }

          this.tieneTabuladores = true;
        }
    }

    console.log("Tabuladores: " + this.tabuladores);

    this.tabuladoresSeleccionados = tabuladorPrincipal.getTabuladores();

    for (var i = 0; i < this.tabuladoresSeleccionados.size; i++) {
      console.log("Tabulador - id: " + this.tabuladoresSeleccionados.get(i).getId());
      this.checkboxesSeleccionados[this.tabuladoresSeleccionados.get(i).getId()] = false;
    }

    this.buscoTabuladores = true;
  }

  cagarDatosIniciales(cabeceraTabuladorPrincipal: CabeceraTabuladorPrincipal){
  	    this.cabeceraTabuladorPrincipal = cabeceraTabuladorPrincipal;
  		if(this.cabeceraTabuladorPrincipal != null){
	    	this.familias = this.cabeceraTabuladorPrincipal.getFamilias();
	    }
  }

  onRubroSeleccionado(codigoErpRubroSeleccionado: string){
  	var rubroEncontrado = null;
  	this.familias.forEach(function(item:Familia) {
  		if(item.getCodigoErpRubro() == codigoErpRubroSeleccionado){
  			rubroEncontrado = item;
  			//TODO deberia de haber un break aca!
  		}
  	});

  	if(rubroEncontrado){
  		this.subrubros = rubroEncontrado.getSubrubros();
  		this.rubro = rubroEncontrado;
      this.codErpRubroSeleccionado = codigoErpRubroSeleccionado;
      this.descripcionRubroSeleccionado = this.rubro.getDescripcionRubro();
  	}
  }

  onSubrubroSeleccionado(codigoErpSubrubroSeleccionado: string){
	  var subrubroEncontrado = null;
  	this.subrubros.forEach(function(item:Subrubro) {
  		if(item.getCodigoErpSubrubro() == codigoErpSubrubroSeleccionado){
  			subrubroEncontrado = item;
  			//TODO deberia de haber un break aca!
  		}
  	});

  	if(subrubroEncontrado){
  		this.caracteristicasA = subrubroEncontrado.getCaracteristicasA();
  		this.subrubro = subrubroEncontrado;
      this.codErpSubrubroSeleccionado = codigoErpSubrubroSeleccionado;
      this.descripcionSubrubroSeleccionado = this.subrubro.getDescripcionSubrubro();
  	}
  }

  onCaracteristicaASeleccionada(codigoErpCaracteristicaASeleccionada: string){
  	var caracteristicaAEncontrada = null;
  	this.caracteristicasA.forEach(function(item:CaracteristicaA) {
  		if(item.getCodigoErpCaracteristicaA() == caracteristicaAEncontrada){
  			caracteristicaAEncontrada = item;
  			//TODO deberia de haber un break aca!
  		}
  	});

  	if(caracteristicaAEncontrada){
  		this.caracteristicasB = caracteristicaAEncontrada.getCaracteristicasB();
  		this.caracteristicaA = caracteristicaAEncontrada;
      this.codErpCaracteristicaASeleccionado = codigoErpCaracteristicaASeleccionada;
      this.descripcionCaracteristicaASeleccionada = this.caracteristicaA.getDescripcionCaracteristicaA();
  	}
  }

  onCaracteristicaBSeleccionada(codigoErpCaracteristicaBSeleccionada: string){
	  var caracteristicaBEncontrada = null;
  	this.caracteristicasB.forEach(function(item:CaracteristicaB) {
  		if(item.getCodigoErpCaracteristicaB() == caracteristicaBEncontrada){
  			caracteristicaBEncontrada = item;
  			//TODO deberia de haber un break aca!
  		}
  	});

  	if(caracteristicaBEncontrada){  		
  		this.caracteristicaB = caracteristicaBEncontrada;
      this.codErpCaracteristicaBSeleccionado = codigoErpCaracteristicaBSeleccionada;
      this.descripcionCaracteristicaBSeleccionada = this.caracteristicaB.getDescripcionCaracteristicaB();
  	}
  }

  onBuscarTabuladores(){
    this.limpiarDatosTabuladoresBuscados();
    this.confTabArtPrincipalService.getDetalleTabuladorPrincipal(this.codErpRubroSeleccionado,
          this.codErpSubrubroSeleccionado, this.codErpCaracteristicaASeleccionado, 
          this.codErpCaracteristicaBSeleccionado, false)
                          .subscribe(
                            detalleTabuladorPrincipal => this.cagarDatosTabuladores(detalleTabuladorPrincipal),
                            error => this.errorMessage = <any>error);
  }

  private cagarDatosTabuladores(detalleTabuladorPrincipal : DetalleTabuladorPrincipal){
    this.detalleTabuladorPrincipal = detalleTabuladorPrincipal;
    if(this.detalleTabuladorPrincipal != null){
        this.yaCreado = this.detalleTabuladorPrincipal.isYaCreado();

        this.tabuladores = this.detalleTabuladorPrincipal.getTabuladores();

        if(this.tabuladores != null && this.tabuladores.size != 0){
          for (var i = 0; i < this.tabuladores.size; i++) {
            console.log("Tabulador - id: " + this.tabuladores.get(i).getId());
            this.checkboxes[this.tabuladores.get(i).getId()] = false;
          }

          this.tieneTabuladores = true;
        }
    }

    console.log("Tabuladores: " + this.tabuladores);

    this.buscoTabuladores = true;
  }

  onQuitarTodos(){
    for (var index = 0; index < this.tabuladoresSeleccionados.size; index++) {     
      var tabulador = this.tabuladoresSeleccionados.get(index);      
      this.tabuladores = this.tabuladores.push(tabulador);
    }

    this.tabuladoresSeleccionados = List<Tabulador>();
    this.checkboxesSeleccionados = [];

    //checkboxes y tabuladores
    for (var i = 0; i < this.tabuladores.size; i++) {
      console.log("Tabulador - id: " + this.tabuladores.get(i).getId());
      this.checkboxes[this.tabuladores.get(i).getId()] = false;
    }
  }

  onQuitar(){
    console.log("Checkboxes seleccionados: " + this.checkboxesSeleccionados);
    console.log("Length de checkboxes seleccionados: " + this.checkboxesSeleccionados.length);
    var checkboxesAux:boolean[];
    var tabuladoresASacar: number[] = [];
    var k = 0;
    for (var i = 0; i < this.checkboxesSeleccionados.length; i++) {    
      console.log("Checkboxes seleccionados en posicion " + i + " contiene : " + this.checkboxesSeleccionados[i]);

      if(this.checkboxesSeleccionados[i] == true){
        //Este seria el valor del getId() = i
        for (var j = this.tabuladoresSeleccionados.size - 1; j >= 0; j--) {
          if(this.tabuladoresSeleccionados.get(j).getId() == i){
            //El index seria j
            tabuladoresASacar[k] = j;
            k++;
          }
        }        
      }
    }

    var indexTabuladoresASacar: number[];
    for (var i = tabuladoresASacar.length - 1; i >= 0; i--) {
      var index = tabuladoresASacar[i];
      var tabulador = this.tabuladoresSeleccionados.get(index);
      this.tabuladoresSeleccionados = this.tabuladoresSeleccionados.remove(index);

      this.tabuladores = this.tabuladores.push(tabulador);
    }

    for (var i = 0; i < this.tabuladoresSeleccionados.size; i++) {
      console.log("Tabulador - id: " + this.tabuladoresSeleccionados.get(i).getId());
      this.checkboxesSeleccionados[this.tabuladoresSeleccionados.get(i).getId()] = false;
    }

    //checkboxes y tabuladores
    for (var i = 0; i < this.tabuladores.size; i++) {
      console.log("Tabulador - id: " + this.tabuladores.get(i).getId());
      this.checkboxes[this.tabuladores.get(i).getId()] = false;
    }
  }

  onAgregar(){
    console.log("Checkboxes: " + this.checkboxes);
    console.log("Length de checkboxes: " + this.checkboxes.length);
    var checkboxesAux:boolean[];
    var tabuladoresASacar: number[] = [];
    var k = 0;
    for (var i = 0; i < this.checkboxes.length; i++) {    
      console.log("Checkboxes en posicion " + i + " contiene : " + this.checkboxes[i]);

      if(this.checkboxes[i] == true){
        //Este seria el valor del getId() = i
        for (var j = 0; j < this.tabuladores.size; j++) {
          if(this.tabuladores.get(j).getId() == i){
            //El index seria j
            tabuladoresASacar[k] = j;
            k++;
          }
        }        
      }
    }

    var indexTabuladoresASacar: number[];
    for (var i = 0; i < tabuladoresASacar.length; i++) {
      var index = tabuladoresASacar[i];
      var tabulador = this.tabuladores.get(index);
      this.tabuladores = this.tabuladores.remove(index);
      this.tabuladoresSeleccionados = this.tabuladoresSeleccionados.push(tabulador);      
    }

    for (var i = 0; i < this.tabuladores.size; i++) {
      console.log("Tabulador - id: " + this.tabuladores.get(i).getId());
      this.checkboxes[this.tabuladores.get(i).getId()] = false;
    }

    for (var i = 0; i < this.tabuladoresSeleccionados.size; i++) {
      console.log("Tabulador seleccionado - id: " + this.tabuladoresSeleccionados.get(i).getId());
      this.checkboxesSeleccionados[this.tabuladoresSeleccionados.get(i).getId()] = false;
    }
  }

  onGuardarTabuladorPrincipal(){
    this.confTabArtPrincipalService.guardarTabuladorPrincipal(this.codErpRubroSeleccionado,
          this.codErpSubrubroSeleccionado, this.codErpCaracteristicaASeleccionado, 
          this.codErpCaracteristicaBSeleccionado, this.tabuladoresSeleccionados,
          this.descripcionRubroSeleccionado, this.descripcionSubrubroSeleccionado,
          this.descripcionCaracteristicaASeleccionada, this.descripcionCaracteristicaBSeleccionada )
                          .subscribe(
                            rdoGuardar => this.guardadoOk(rdoGuardar),
                            error => this.errorMessage = <any>error);
  }

  private guardadoOk(rdoGuardar: any){
     let link = ['ConfiguracionTabArtPrincipal',];
     this.router.navigate(link);
  }

  private limpiarDatosTabuladoresBuscados(){
    this.buscoTabuladores = false;
    this.tieneTabuladores = false;    
    this.checkboxes=[];
    this.tabuladoresSeleccionados = List<Tabulador>();
    this.checkboxesSeleccionados = [];    
  }

  //TODO FALTA: SUBIR Y BAJAR, EL ORDEN EN LA LISTA BASE CUANDO SE AGREGAN, Y LO DEL ICONO (IMAGEN)!
  // tb me falta al guardar las validaciones de cantidad de tabuladores seleccionados!
}
