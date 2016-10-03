import {Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
  moduleId: module.id,
  selector : 'app-login',
  templateUrl : 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent implements OnInit, OnDestroy {

  constructor(private router:Router) {
    
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
  } 

  doLogin(usuario:string, password:string) {
      let link = ['Dashboard',];
      this.router.navigate(link);
  }
}
