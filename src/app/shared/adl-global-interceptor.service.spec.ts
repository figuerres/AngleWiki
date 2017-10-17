import { TestBed, inject } from '@angular/core/testing';

import { AdlGlobalInterceptor } from './adl-global-interceptor.service';

describe('AdlGlobalInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdlGlobalInterceptor]
    });
  });

  it('should be created', inject([AdlGlobalInterceptor], (service: AdlGlobalInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
