import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthroizedComponent } from './unauthroized.component';

describe('UnauthroizedComponent', () => {
  let component: UnauthroizedComponent;
  let fixture: ComponentFixture<UnauthroizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthroizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthroizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
