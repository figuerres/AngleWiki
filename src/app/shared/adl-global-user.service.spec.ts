import { TestBed, inject } from '@angular/core/testing';

import { AdlGlobalUserService } from './adl-global-user.service';

describe('AdlGlobalUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdlGlobalUserService]
    });
  });

  it('should be created', inject([AdlGlobalUserService], (service: AdlGlobalUserService) => {
    expect(service).toBeTruthy();
  }));
});
