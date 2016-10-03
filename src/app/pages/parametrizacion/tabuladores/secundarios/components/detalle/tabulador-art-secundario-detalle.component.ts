import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { CabeceraTabuladorPrincipal } from '../../../principal/beans/cabecera-tabulador-principal';
import { DetalleTabuladorPrincipal } from '../../../principal/beans/detalle-tabulador-principal';
import { ConfiguracionTabArtPrincipalService } from '../../../principal/services/configuracion-tab-art-principal.service';
import { List } from 'immutable';
import { Familia } from '../../../../../core/beans/familia';
import { PlanPago } from '../../../../../core/beans/plan-pago';
import { Subrubro } from '../../../../../core/beans/subrubro';
import { CaracteristicaA } from '../../../../../core/beans/caracteristica-a';
import { CaracteristicaB } from '../../../../../core/beans/caracteristica-b';
import { Tabulador } from '../../../../../core/beans/tabulador';
import { TabuladorItem } from '../../../../../core/beans/tabulador-item';
import { TabuladorEquivalente } from '../../../../../core/beans/tabulador-equivalente';
import { DetalleTabuladorEquivalente } from '../../beans/detalle-tabulador-equivalente';
import { Router } from '@angular/router-deprecated';
import * as moment from 'moment';
moment().format();
import { TabuladorArtSecundarioService } from '../../services/tabulador-art-secundario.service';
import { RouteParams, } from '@angular/router-deprecated';

@Component({
  moduleId: module.id,
  selector: 'app-tabulador-art-secundario-detalle',
  templateUrl: 'tabulador-art-secundario-detalle.component.html',
  styleUrls: ['tabulador-art-secundario-detalle.component.css'],
  directives: [
  	ROUTER_DIRECTIVES,
  ],
  providers: [
    ConfiguracionTabArtPrincipalService,
    TabuladorArtSecundarioService
  ],
})
export class TabuladorArtSecundarioDetalleComponent implements OnInit {

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

  caracteristicasB : List<CaracteristicaB>;
  caracteristicaB : CaracteristicaB;
  codErpCaracteristicaBSeleccionado: string;

  buscoTabuladores: boolean;
  detalleTabuladorEquivalente : DetalleTabuladorEquivalente;
  tabuladorEquivalente : TabuladorEquivalente;
  //tabuladores : List<TabuladorItem>;
  tabuladores : List<Tabulador>;
  tieneTabuladores : boolean;
  
  checkboxes:boolean[];
  //tabuladoresSeleccionados : List<TabuladorItem>;
  tabuladoresSeleccionados : List<Tabulador>;

  checkboxesSeleccionados:boolean[];
  yaCreado: boolean;
  esEdicion: boolean;
  descripcionCaracteristicaBSeleccionada: string;
  descripcionCaracteristicaASeleccionada: string;

  constructor(private confTabArtPrincipalService: ConfiguracionTabArtPrincipalService,
              private router: Router,
              private confTabEquivalenteService: TabuladorArtSecundarioService,
              private routeParams: RouteParams) {
  	this.buscoTabuladores = false;
    this.tieneTabuladores = false;
    this.codErpRubroSeleccionado = "00";
    this.descripcionRubroSeleccionado = "";
    this.codErpSubrubroSeleccionado = "00";
    this.descripcionSubrubroSeleccionado = "";
    this.codErpCaracteristicaASeleccionado = "00";
    this.codErpCaracteristicaBSeleccionado = "00";   
    this.checkboxes=[];
    this.tabuladoresSeleccionados = List<Tabulador>();
    this.checkboxesSeleccionados = [];
    this.tabuladores = List<Tabulador>();
    this.yaCreado = false;
    this.esEdicion = false;
    this.descripcionCaracteristicaBSeleccionada = "";
    this.descripcionCaracteristicaASeleccionada = "";
  }

  ngOnInit() {
    if (this.routeParams.get('tabEquivalente') !== null) {
      let codigoErpTabEquivalente = this.routeParams.get('tabEquivalente');
      this.onModoEdicion(codigoErpTabEquivalente);
    } else {
      this.confTabArtPrincipalService.getCabeceraTabuladorPrincipal()
                          .subscribe(
                            cabeceraTabuladorPrincipal => this.cagarDatosIniciales(cabeceraTabuladorPrincipal),
                            error => this.errorMessage = <any>error);
    }
  }

  private onModoEdicion(codigoErpTabEquivalente: string){
    this.confTabEquivalenteService.getTabuladorEquivalente(codigoErpTabEquivalente)
                          .subscribe(
                            tabuladorEquivalenteEdicion => this.cargarTabuladorEquivalenteEdicion(tabuladorEquivalenteEdicion),
                            error => this.errorMessage = <any>error);
  }

  private cargarTabuladorEquivalenteEdicion(tabuladorEquivalente: TabuladorEquivalente){
    this.esEdicion = true;
    this.buscoTabuladores = true;
    this.tieneTabuladores = true;
    this.codErpRubroSeleccionado = tabuladorEquivalente.getTabuladorPrincipal().getCodigoErpRubro();
    this.descripcionRubroSeleccionado = tabuladorEquivalente.getTabuladorPrincipal().getDescripcionRubro();
    this.codErpSubrubroSeleccionado = tabuladorEquivalente.getTabuladorPrincipal().getCodigoErpSubrubro();
    this.descripcionSubrubroSeleccionado = tabuladorEquivalente.getTabuladorPrincipal().getDescripcionSubrubro();
    this.codErpCaracteristicaASeleccionado = tabuladorEquivalente.getTabuladorPrincipal().getCodigoErpCaracteristicaA();
    this.descripcionCaracteristicaASeleccionada = tabuladorEquivalente.getTabuladorPrincipal().getDescripcionCaracteristicaA();
    this.codErpCaracteristicaBSeleccionado = tabuladorEquivalente.getTabuladorPrincipal().getCodigoErpCaracteristicaB();
    this.descripcionCaracteristicaBSeleccionada = tabuladorEquivalente.getTabuladorPrincipal().getDescripcionCaracteristicaB();

    this.confTabEquivalenteService.getDetalleTabuladorEquivalente(this.codErpRubroSeleccionado,
          this.codErpSubrubroSeleccionado, this.codErpCaracteristicaASeleccionado, 
          this.codErpCaracteristicaBSeleccionado, true)
                          .subscribe(
                            detalleTabuladorEquivalente => this.cagarDatosTabuladoresEditar(detalleTabuladorEquivalente, tabuladorEquivalente),
                            error => this.errorMessage = <any>error);
  }

  private cagarDatosTabuladoresEditar(detalleTabuladorEquivalente : DetalleTabuladorEquivalente, 
            tabuladorEquivalente: TabuladorEquivalente){
    this.detalleTabuladorEquivalente = detalleTabuladorEquivalente;
    if(this.detalleTabuladorEquivalente != null){ 
        this.yaCreado = false;       
        this.tabuladorEquivalente = tabuladorEquivalente;
        if(tabuladorEquivalente.getTabuladoresSeleccionados() != null){
          this.tabuladoresSeleccionados = tabuladorEquivalente.getTabuladoresSeleccionados();
        }

        if(this.detalleTabuladorEquivalente.getTabuladorPrincipal() != null
            && this.detalleTabuladorEquivalente.getTabuladorPrincipal().size() != 0){
          //this.tabuladores = this.detalleTabuladorEquivalente.getTabuladorPrincipal().getTabuladores(); 
          if(tabuladorEquivalente.getTabuladoresSeleccionados() == null){
            this.tabuladores = this.detalleTabuladorEquivalente.getTabuladorPrincipal().getTabuladores(); 
          } else {
            var tabaluadoresVer = List<Tabulador>();
            if(tabuladorEquivalente.getTabuladoresSeleccionados() != null 
              && !tabuladorEquivalente.getTabuladoresSeleccionados().isEmpty()){
                this.detalleTabuladorEquivalente.getTabuladorPrincipal().getTabuladores().forEach(function(item:Tabulador) {
                tabuladorEquivalente.getTabuladoresSeleccionados().forEach(function(itemSeleccionado:Tabulador) {
                  if(itemSeleccionado.getDescripcion() != item.getDescripcion()){
                    tabaluadoresVer = tabaluadoresVer.push(item);  
                  }            
                });       
              });
            } else {
              tabaluadoresVer = this.detalleTabuladorEquivalente.getTabuladorPrincipal().getTabuladores();
            }

            
            this.tabuladores = tabaluadoresVer; 
          } 
        }
        
        if(this.tabuladores != null && this.tabuladores.size != 0){
          for (var i = 0; i < this.tabuladores.size; i++) {
            console.log("Tabulador - id: " + this.tabuladores.get(i).getId());
            this.checkboxes[this.tabuladores.get(i).getId()] = false;
          }

          this.tieneTabuladores = true;
        }

        if(this.tabuladoresSeleccionados != null && this.tabuladoresSeleccionados.size != 0){
          for (var i = 0; i < this.tabuladoresSeleccionados.size; i++) {
            console.log("Tabulador - id: " + this.tabuladoresSeleccionados.get(i).getId());
            this.checkboxesSeleccionados[this.tabuladoresSeleccionados.get(i).getId()] = false;
          }
        }
    }

    console.log("Tabuladores: " + this.tabuladores);

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
  	}
  }

  onBuscarTabuladores(){
    this.confTabEquivalenteService.getDetalleTabuladorEquivalente(this.codErpRubroSeleccionado,
          this.codErpSubrubroSeleccionado, this.codErpCaracteristicaASeleccionado, 
          this.codErpCaracteristicaBSeleccionado, false)
                          .subscribe(
                            detalleTabuladorEquivalente => this.cargarTabuladorEquivalente(detalleTabuladorEquivalente),
                            error => this.errorMessage = <any>error);
  }

  private cargarTabuladorEquivalente(detalleTabuladorEquivalente : DetalleTabuladorEquivalente){	
    this.detalleTabuladorEquivalente = detalleTabuladorEquivalente;
    if(this.detalleTabuladorEquivalente != null){
        this.yaCreado = this.detalleTabuladorEquivalente.isYaCreado();
        if(this.detalleTabuladorEquivalente.getTabuladorEquivalente() != null
            && this.detalleTabuladorEquivalente.getTabuladorEquivalente().size() != 0){
          this.tabuladorEquivalente = this.detalleTabuladorEquivalente.getTabuladorEquivalente();
          this.tabuladoresSeleccionados = this.tabuladorEquivalente.getTabuladoresSeleccionados();    
        }

        if(this.detalleTabuladorEquivalente.getTabuladorPrincipal() != null
            && this.detalleTabuladorEquivalente.getTabuladorPrincipal().size() != 0){
          this.tabuladores = this.detalleTabuladorEquivalente.getTabuladorPrincipal().getTabuladores();
        }
        
        if(this.tabuladores != null && this.tabuladores.size != 0){
          for (var i = 0; i < this.tabuladores.size; i++) {
            console.log("Tabulador - id: " + this.tabuladores.get(i).getId());
            this.checkboxes[this.tabuladores.get(i).getId()] = false;
          }

          this.tieneTabuladores = true;
        }

        if(this.tabuladoresSeleccionados != null && this.tabuladoresSeleccionados.size != 0){
          for (var i = 0; i < this.tabuladoresSeleccionados.size; i++) {
            console.log("Tabulador - id: " + this.tabuladoresSeleccionados.get(i).getId());
            this.checkboxesSeleccionados[this.tabuladoresSeleccionados.get(i).getId()] = false;
          }
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
    for (var i = tabuladoresASacar.length - 1; i >= 0; i--) {
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

  onGuardarTabuladorEquivalente(){   
    this.confTabEquivalenteService.guardarTabuladorEquivalente(
          this.tabuladoresSeleccionados,          
          this.detalleTabuladorEquivalente.getTabuladorEquivalente(), 
          this.detalleTabuladorEquivalente.getTabuladorPrincipal() )
                          .subscribe(
                            rdoGuardar => this.guardadoOk(rdoGuardar),
                            error => this.errorMessage = <any>error);
  }

  private guardadoOk(rdoGuardar: any){
     let link = ['ConfiguracionTabArtSecundarios',];
     this.router.navigate(link);
  }

}
