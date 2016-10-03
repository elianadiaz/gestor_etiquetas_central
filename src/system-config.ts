// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
/*const map: any = {
    'moment': 'vendor/moment/moment.js',
    'ng2-bootstrap': 'vendor/ng2-bootstrap', 
    "angular2-jwt": "vendor/angular2-jwt",
    'immutable': 'vendor/immutable/dist/immutable.js',
    'angular2-uuid': 'vendor/angular2-uuid/index.js',
};*/

const map: any = {
    'moment': 'vendor/moment/moment.js',
    'ng2-bootstrap': 'vendor/ng2-bootstrap', 
    'immutable': 'vendor/immutable/dist/immutable.js',
    'angular2-uuid': 'vendor/angular2-uuid/index.js',
};

/** User packages configuration. */
/*const packages: any = {
  'vendor/ng2-bootstrap': { 
    defaultExtension: 'js' 
  },
  'vendor/angular2-jwt': { 
    defaultExtension: 'js' 
  },
  'immutable':{
    format: 'cjs'
  },
  'angular2-uuid':{
    format: 'cjs'
  },
};*/
const packages: any = {
  'vendor/ng2-bootstrap': { 
    defaultExtension: 'js' 
  },  
  'immutable':{
    format: 'cjs'
  },
  'angular2-uuid':{
    format: 'cjs'
  },
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/forms',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router-deprecated',

  // Thirdparty barrels.
  'rxjs',
  'moment',
  'ng2-bootstrap',
  'font-awesome',
  //'angular2-jwt',
  'immutable',

  // App specific barrels.
  'app',
  'app/shared',
  'app/layouts',
  'app/pages',
  'app/pages/login',
  'app/pages/signup',
  'app/pages/dashboard',
  'app/pages/signup/components/signup',  
  'app/pages/dashboard/components/dashboard',
  'app/pages/topnav/components/topnav',
  'app/pages/sidebar/components/sidebar',  
  'app/pages/parametrizacion/financiacion/components/configuracion-financiacion',
  'app/pages/parametrizacion/umbral/components/configuracion-umbral',
  'app/pages/parametrizacion/tabuladores/principal/components/base/configuracion-tab-art-principal',
  'app/pages/parametrizacion/tabuladores/secundarios/components/configuracion-tab-art-secundarios',
  'app/pages/base/components/base',
  'app/pages/etiquetas/etiquetas-equivalentes/components/etiquetas-equivalentes',
  'app/pages/parametrizacion/tabuladores/principal/components/detalle/tabulador-art-principal-detalle',
  'app/pages/parametrizacion/tabuladores/secundarios/components/detalle/tabulador-art-secundario-detalle',
  'app/pages/etiquetas/etiquetas-equivalentes/base/components/etiqueta-equivalente-listado',
  'app/pages/etiquetas/etiquetas-equivalentes/detalle/components/etiqueta-equivalente-detalle',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
