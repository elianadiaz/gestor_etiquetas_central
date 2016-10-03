import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { List } from 'immutable';
import { EtiquetaEquivalente } from '../../../../core/beans/etiqueta-equivalente';

@Component({
  moduleId: module.id,
  selector: 'app-etiqueta-equivalente-listado',
  templateUrl: 'etiqueta-equivalente-listado.component.html',
  styleUrls: ['etiqueta-equivalente-listado.component.css'],
  directives: [
  	ROUTER_DIRECTIVES,
  ],
})
export class EtiquetaEquivalenteListadoComponent implements OnInit {

  etiquetasEquivalentes: List<EtiquetaEquivalente>;
  constructor() {}

  ngOnInit() {
  }

  irPrevisualizar

  irEditar

  irEliminar

}
