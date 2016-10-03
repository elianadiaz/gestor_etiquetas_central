import { provideRouter, RouterConfig }  from '@angular/router';
import { LoginComponent } from './pages/login/components/login.component';
import { DashboardComponent } from './pages/dashboard/components/dashboard.component';
import { ConfiguracionFinanciacionComponent } from './pages/parametrizacion/financiacion/components/configuracion-financiacion.component';
import { ConfiguracionUmbralComponent } from './pages/parametrizacion/umbral/components/configuracion-umbral.component';
import { ConfiguracionTabArtPrincipalComponent } from './pages/parametrizacion/tabuladores/principal/components/base/configuracion-tab-art-principal.component';
import { TabuladorArtPrincipalDetalleComponent } from './pages/parametrizacion/tabuladores/principal/components/detalle/tabulador-art-principal-detalle.component';
import { ConfiguracionTabArtSecundariosComponent } from './pages/parametrizacion/tabuladores/secundarios/components/base/configuracion-tab-art-secundarios.component';
import { TabuladorArtSecundarioDetalleComponent } from './pages/parametrizacion/tabuladores/secundarios/components/detalle/tabulador-art-secundario-detalle.component';
import { EtiquetaEquivalenteListadoComponent } from './pages/etiquetas/etiquetas-equivalentes/components/base/etiqueta-equivalente-listado.component';
import { EtiquetaEquivalenteDetalleComponent } from './pages/etiquetas/etiquetas-equivalentes/components/detalle/etiqueta-equivalente-detalle.component';

const routes: RouterConfig = [
  { 
  	path: '/', 
  	component: LoginComponent 
  },
  {
    path: '/login',
    component: LoginComponent
  },  
  { 
    path: '/dashboard', 
    component: DashboardComponent 
  },   
  { 
    path: '/configuracionFinanciacion', 
    component: ConfiguracionFinanciacionComponent    
  },
  { 
    path: '/configuracionUmbral', 
    component: ConfiguracionUmbralComponent,  
  }, 
  { 
    path: '/configuracionTabArtPrincipal', 
    component: ConfiguracionTabArtPrincipalComponent
  },   
  { 
    path: '/tabuladorArtPrincipalDetalle', 
    component: TabuladorArtPrincipalDetalleComponent    
  },
  { 
    path: '/configuracionTabArtSecundarios', 
    component: ConfiguracionTabArtSecundariosComponent
  },
  { 
    path: '/tabuladorArtSecundariosDetalle', 
    component: TabuladorArtSecundarioDetalleComponent
  },
  { 
    path: '/etiquetaEquivalenteListado', 
    component: EtiquetaEquivalenteListadoComponent
  },
  { 
    path: '/etiquetaEquivalenteDetalle', 
    component: EtiquetaEquivalenteDetalleComponent
  },  
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
