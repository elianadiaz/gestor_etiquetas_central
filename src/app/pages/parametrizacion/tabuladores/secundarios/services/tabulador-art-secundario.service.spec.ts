/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { TabuladorArtSecundarioService } from './tabulador-art-secundario.service';

describe('TabuladorArtSecundario Service', () => {
  beforeEachProviders(() => [TabuladorArtSecundarioService]);

  it('should ...',
      inject([TabuladorArtSecundarioService], (service: TabuladorArtSecundarioService) => {
    expect(service).toBeTruthy();
  }));
});
