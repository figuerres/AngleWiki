import { TestBed, inject } from '@angular/core/testing';

import { AdlGlobalConfig } from './adl-global-config.service';

describe('AdlGlobalConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdlGlobalConfig]
    });
  });

  it('should be created', inject([AdlGlobalConfig], (service: AdlGlobalConfig) => {
    expect(service).toBeTruthy();
  }));
});
