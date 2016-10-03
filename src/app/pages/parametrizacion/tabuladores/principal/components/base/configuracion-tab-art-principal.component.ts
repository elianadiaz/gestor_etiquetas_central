import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ConfiguracionTabArtPrincipalService } from '../../services/configuracion-tab-art-principal.service';
import { List } from 'immutable';
import { TabuladorPrincipal } from '../../../../../core/beans/tabulador-principal';
import { Router } from '@angular/router-deprecated';

@Component({
  moduleId: module.id,
  selector: 'app-configuracion-tab-art-principal',
  templateUrl: 'configuracion-tab-art-principal.component.html',
  styleUrls: ['configuracion-tab-art-principal.component.css'],
  directives: [
  	ROUTER_DIRECTIVES,
  ],
  providers: [
    ConfiguracionTabArtPrincipalService
  ],
})
export class ConfiguracionTabArtPrincipalComponent implements OnInit {

  errorMessage: string;
  tabuladores: List<TabuladorPrincipal>;
  
  constructor(private router: Router, 
    private confTabArtPrincipalService: ConfiguracionTabArtPrincipalService) {}

  ngOnInit() {
    this.confTabArtPrincipalService.getTabuladoresPrincipales()
                          .subscribe(
                            tabuladoresPrincipales => this.tabuladores = tabuladoresPrincipales,
                            error => this.errorMessage = <any>error);

  }

  irEditar(id:number){
    var idTabuladorPrincipalCadena = id  + "";
    this.router.navigate(['TabuladorArtPrincipalDetalle', { tabPrincipal: idTabuladorPrincipalCadena } ]);
  }

  irEliminar(idTabulador:number){
    this.confTabArtPrincipalService.eliminarTabuladorPrincipal(idTabulador)
                          .subscribe(
                            tabuladoresPrincipales => this.tabuladores = tabuladoresPrincipales,
                            error => this.errorMessage = <any>error);
  }
}
