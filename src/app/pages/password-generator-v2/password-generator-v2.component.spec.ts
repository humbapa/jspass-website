import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGeneratorV2Component } from './password-generator-v2.component';

import { FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('PasswordGeneratorV2Component', () => {
  let component: PasswordGeneratorV2Component;
  let fixture: ComponentFixture<PasswordGeneratorV2Component>;

  beforeEach(
    waitForAsync(() => {
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
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordGeneratorV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create password with special chars and numbers', async () => {
    fixture = TestBed.createComponent(PasswordGeneratorV2Component);
    component = fixture.componentInstance;
    const password = await component.createPasswordAsync(
      'somesite.com',
      'asdf',
      {
        salt: 'a1b2c3d4',
        passwordlength: 15,
        iterations: 99,
        specialchars: '@!?_#%.-*&$^:',
        usespecialchars: true,
        minspecialchars: 2,
        usenumbers: true,
        minnumbers: 2,
      }
    );
    expect(password).toEqual('j^552IWCFlJLg_L');
  });

  it('should create password with special chars and numbers but different password', async () => {
    fixture = TestBed.createComponent(PasswordGeneratorV2Component);
    component = fixture.componentInstance;
    const password = await component.createPasswordAsync(
      'somesite.com',
      'asdfg',
      {
        salt: 'a1b2c3d4',
        passwordlength: 15,
        iterations: 99,
        specialchars: '@!?_#%.-*&$^:',
        usespecialchars: true,
        minspecialchars: 2,
        usenumbers: true,
        minnumbers: 2,
      }
    );
    expect(password).toEqual('W2a_4P9pp!LsJ3r');
  });
});
