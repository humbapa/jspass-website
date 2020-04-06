import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGeneratorV2Component } from './password-generator-v2.component';

describe('PasswordGeneratorV2Component', () => {
  let component: PasswordGeneratorV2Component;
  let fixture: ComponentFixture<PasswordGeneratorV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordGeneratorV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordGeneratorV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
