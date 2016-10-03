/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { AppSettingsService } from './app-settings.service';

describe('AppSettings Service', () => {
  beforeEachProviders(() => [AppSettingsService]);

  it('should ...',
      inject([AppSettingsService], (service: AppSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
