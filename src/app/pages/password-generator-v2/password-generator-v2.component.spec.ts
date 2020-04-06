import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGeneratorV2Component } from './password-generator-v2.component';

import { FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('PasswordGeneratorV2Component', () => {
  let component: PasswordGeneratorV2Component;
  let fixture: ComponentFixture<PasswordGeneratorV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordGeneratorV2Component],
      providers: [
        {
          provide: FormBuilder,
          useValue: {
            group: () => {
              return {
                get: () => {
                  return {
                    valueChanges: {
                      pipe: () => {
                        return { subscribe: () => {} };
                      },
                    },
                  };
                },
              };
            },
          },
        },
        { provide: MatBottomSheet, useValue: {} },
        { provide: MatDialog, useValue: {} },
      ],
      imports: [MatAutocompleteModule],
    }).compileComponents();
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
