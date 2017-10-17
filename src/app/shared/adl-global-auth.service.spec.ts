import { TestBed, inject } from '@angular/core/testing';

import { AdlGlobalAuth } from './adl-global-auth.service';

describe('AdlGlobalAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdlGlobalAuth]
    });
  });

  it('should be created', inject([AdlGlobalAuth], (service: AdlGlobalAuth) => {
    expect(service).toBeTruthy();
  }));
});
