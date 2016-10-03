import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
  moduleId: module.id,
  selector: 'app-configuracion-financiacion',
  templateUrl: 'configuracion-financiacion.component.html',
  styleUrls: ['configuracion-financiacion.component.css'],
  directives: [
  	ROUTER_DIRECTIVES,
  ]
})
export class ConfiguracionFinanciacionComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
