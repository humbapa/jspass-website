import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGeneratorV1Component } from './password-generator-v1.component';

describe('PasswordGeneratorV1Component', () => {
  let component: PasswordGeneratorV1Component;
  let fixture: ComponentFixture<PasswordGeneratorV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordGeneratorV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordGeneratorV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
