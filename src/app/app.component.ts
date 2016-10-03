import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import { LoginComponent } from './pages/login/components/login.component';
import { DashboardComponent } from './pages/dashboard/components/dashboard.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ROUTER_PROVIDERS],
  directives: [
  	ROUTER_DIRECTIVES,
  	LoginComponent,
    DashboardComponent,
  ]
})

@RouteConfig([
  {
    path: '/',
    component: LoginComponent,
    name: 'Login'
  },
  {
    path: '/login',
    component: LoginComponent,
    name: 'Login',
    useAsDefault: true
  },  
  {
    path: '/dashboard/...',  
    component: DashboardComponent,
    name: 'Dashboard'
  }, 
])

export class AppComponent {
  title = 'Frávega - Gestor de Etiquetas';

  viewContainerRef: any = null;
  public constructor(viewContainerRef:ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }
}
