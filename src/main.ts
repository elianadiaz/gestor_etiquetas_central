import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppSettingsService } from './app/app-settings.service';
import { FiltroCodigoArticuloPipe } from './app/pages/core/pipes/filtro-codigo-articulo.pipe';


if (environment.production) {
  enableProdMode();
}



bootstrap(AppComponent, [HTTP_PROVIDERS, AppSettingsService, FiltroCodigoArticuloPipe]);

