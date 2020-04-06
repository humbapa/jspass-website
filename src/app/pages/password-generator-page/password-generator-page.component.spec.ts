import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGeneratorPageComponent } from './password-generator-page.component';

import { MatBottomSheet } from '@angular/material/bottom-sheet';

describe('PasswordGeneratorPageComponent', () => {
  let component: PasswordGeneratorPageComponent;
  let fixture: ComponentFixture<PasswordGeneratorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordGeneratorPageComponent],
      providers: [{ provide: MatBottomSheet, useValue: { open: () => {} } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordGeneratorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
