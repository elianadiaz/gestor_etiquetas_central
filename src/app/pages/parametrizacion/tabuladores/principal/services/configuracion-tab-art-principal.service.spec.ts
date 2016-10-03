/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ConfiguracionTabArtPrincipalService } from './configuracion-tab-art-principal.service';

describe('ConfiguracionTabArtPrincipal Service', () => {
  beforeEachProviders(() => [ConfiguracionTabArtPrincipalService]);

  it('should ...',
      inject([ConfiguracionTabArtPrincipalService], (service: ConfiguracionTabArtPrincipalService) => {
    expect(service).toBeTruthy();
  }));
});
