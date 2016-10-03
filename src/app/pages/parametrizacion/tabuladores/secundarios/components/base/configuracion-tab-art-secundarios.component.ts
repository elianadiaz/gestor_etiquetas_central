import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { TabuladorArtSecundarioService } from '../../services/tabulador-art-secundario.service';
import { TabuladorEquivalente } from '../../../../../core/beans/tabulador-equivalente';
import { TabuladorPrincipal } from '../../../../../core/beans/tabulador-principal';
import { List } from 'immutable';
import * as moment from 'moment';
moment().format();
import { Router } from '@angular/router-deprecated';

@Component({
  moduleId: module.id,
  selector: 'app-configuracion-tab-art-secundarios',
  templateUrl: 'configuracion-tab-art-secundarios.component.html',
  styleUrls: ['configuracion-tab-art-secundarios.component.css'],
  directives: [
  	ROUTER_DIRECTIVES,
  ],
  providers: [
    TabuladorArtSecundarioService
  ],  
})

export class ConfiguracionTabArtSecundariosComponent implements OnInit {

  errorMessage: string;
  tabuladores: List<TabuladorEquivalente>;
  constructor(private router: Router, 
    private tabArtSecundarioService: TabuladorArtSecundarioService) {
    this.tabArtSecundarioService.getTabuladoresEquivalentes()
                          .subscribe(
                            tabuladoresEquivalentes => this.tabuladores = tabuladoresEquivalentes,
                            error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    

  }

  irEditar(codigoerpFamilia:string){    
    this.router.navigate(['TabuladorArtSecundariosDetalle', { tabEquivalente: codigoerpFamilia } ]);
  }

  irEliminar(idTabuladorEquivalente:number){
    this.tabArtSecundarioService.eliminarTabuladorEquivalente(idTabuladorEquivalente)
                          .subscribe(
                            tabuladoresEquivalentes => this.tabuladores = tabuladoresEquivalentes,
                            error => this.errorMessage = <any>error);  
    
  }

}
