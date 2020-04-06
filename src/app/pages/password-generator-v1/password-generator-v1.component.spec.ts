import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGeneratorV1Component } from './password-generator-v1.component';

import { FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('PasswordGeneratorV1Component', () => {
  let component: PasswordGeneratorV1Component;
  let fixture: ComponentFixture<PasswordGeneratorV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordGeneratorV1Component],
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
    fixture = TestBed.createComponent(PasswordGeneratorV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
