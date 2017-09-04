import { TestBed, inject } from '@angular/core/testing';

import { WikiPagesService } from './wiki-pages.service';

describe('WikiPagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WikiPagesService]
    });
  });

  it('should be created', inject([WikiPagesService], (service: WikiPagesService) => {
    expect(service).toBeTruthy();
  }));
});
