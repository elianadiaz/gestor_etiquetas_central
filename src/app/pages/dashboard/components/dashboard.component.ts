import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { ConfiguracionFinanciacionComponent } from '../../../pages/parametrizacion/financiacion/components/configuracion-financiacion.component';
import { ConfiguracionUmbralComponent } from '../../../pages/parametrizacion/umbral/components/configuracion-umbral.component';
import { ConfiguracionTabArtPrincipalComponent } from '../../../pages/parametrizacion/tabuladores/principal/components/base/configuracion-tab-art-principal.component';
import { TabuladorArtPrincipalDetalleComponent } from '../../../pages/parametrizacion/tabuladores/principal/components/detalle/tabulador-art-principal-detalle.component';
import { ConfiguracionTabArtSecundariosComponent } from '../../../pages/parametrizacion/tabuladores/secundarios/components/base/configuracion-tab-art-secundarios.component';
import { TabuladorArtSecundarioDetalleComponent } from '../../../pages/parametrizacion/tabuladores/secundarios/components/detalle/tabulador-art-secundario-detalle.component';
import { BaseComponent } from '../../../pages/base/components/base.component';
import { EtiquetaEquivalenteListadoComponent } from '../../../pages/etiquetas/etiquetas-equivalentes/components/base/etiqueta-equivalente-listado.component';
import { EtiquetaEquivalenteDetalleComponent } from '../../../pages/etiquetas/etiquetas-equivalentes/components/detalle/etiqueta-equivalente-detalle.component';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [
  	ROUTER_DIRECTIVES,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    DROPDOWN_DIRECTIVES,
    ConfiguracionFinanciacionComponent,
    ConfiguracionUmbralComponent,
    ConfiguracionTabArtPrincipalComponent,
    TabuladorArtPrincipalDetalleComponent,
    ConfiguracionTabArtSecundariosComponent,
    TabuladorArtSecundarioDetalleComponent,
    BaseComponent,
    EtiquetaEquivalenteListadoComponent,
    EtiquetaEquivalenteDetalleComponent,
  ]
})

@RouteConfig([  
  { 
    path: '/configuracionFinanciacion', 
    component: ConfiguracionFinanciacionComponent,
    name: 'ConfiguracionFinanciacion'
  },
  { 
    path: '/configuracionUmbral', 
    component: ConfiguracionUmbralComponent,
    name: 'ConfiguracionUmbral'
  },
  { 
    path: '/configuracionTabArtPrincipal', 
    component: ConfiguracionTabArtPrincipalComponent,
    name: 'ConfiguracionTabArtPrincipal',
  },
  { 
    path: '/tabuladorArtPrincipalDetalle', 
    component: TabuladorArtPrincipalDetalleComponent,
    name: 'TabuladorArtPrincipalDetalle'
  },
  { 
    path: '/configuracionTabArtSecundarios', 
    component: ConfiguracionTabArtSecundariosComponent,
    name: 'ConfiguracionTabArtSecundarios'
  },
  { 
    path: '/tabuladorArtSecundariosDetalle', 
    component: TabuladorArtSecundarioDetalleComponent,
    name: 'TabuladorArtSecundariosDetalle'
  },
  { 
    path: '/', 
    component: BaseComponent,
    name: 'Base',
    useAsDefault: true
  }, 
  { 
    path: '/etiquetaEquivalenteListado', 
    component: EtiquetaEquivalenteListadoComponent,
    name: 'EtiquetaEquivalenteListado'
  }, 
  { 
    path: '/etiquetaEquivalenteDetalle', 
    component: EtiquetaEquivalenteDetalleComponent,
    name: 'EtiquetaEquivalenteDetalle'
  },
])

export class DashboardComponent implements OnInit {

  showMenuParametrizacion: string = '';
  showMenuEtiquetas: string = '';

  constructor(private router:Router) {    
  }

  ngOnInit() {
  }

  addExpandClass(element) {
    if (element === this.showMenuParametrizacion) {
      this.showMenuParametrizacion = '0';
    } if (element === this.showMenuEtiquetas) {
      this.showMenuEtiquetas = '0';
    } else {
      this.showMenuParametrizacion = element;
      this.showMenuEtiquetas = element;
    }
  }  

  gotoLogin() {
    this.router.navigate(['Login']);
  }

}
