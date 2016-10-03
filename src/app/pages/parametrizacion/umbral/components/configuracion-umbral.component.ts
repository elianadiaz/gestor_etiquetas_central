import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
  moduleId: module.id,
  selector: 'app-configuracion-umbral',
  templateUrl: 'configuracion-umbral.component.html',
  styleUrls: ['configuracion-umbral.component.css'],
  directives: [
  	ROUTER_DIRECTIVES,
  ]
})
export class ConfiguracionUmbralComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
