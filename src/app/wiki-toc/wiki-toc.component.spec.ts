import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiTocComponent } from './wiki-toc.component';

describe('WikiTocComponent', () => {
  let component: WikiTocComponent;
  let fixture: ComponentFixture<WikiTocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiTocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
