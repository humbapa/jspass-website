import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsFormComponent } from './options-form.component';

import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

describe('OptionsFormComponent', () => {
  let component: OptionsFormComponent;
  let fixture: ComponentFixture<OptionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsFormComponent],
      providers: [
        {
          provide: FormBuilder,
          useValue: {
            group: () => {
              return {
                get: () => {
                  return {
                    invalid: true,
                    errors: {
                      required: false,
                    },
                  };
                },
                patchValue: () => {},
              };
            },
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            openFromComponent: () => {},
          },
        },
        { provide: Router, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});