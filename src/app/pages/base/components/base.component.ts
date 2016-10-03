import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
  moduleId: module.id,
  selector: 'app-base',
  templateUrl: 'base.component.html',
  styleUrls: ['base.component.css'],
  directives: [
  	ROUTER_DIRECTIVES,
  ]
})
export class BaseComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
