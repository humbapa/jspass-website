import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGeneratorV1Component } from './password-generator-v1.component';

import { FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('PasswordGeneratorV1Component', () => {
  let component: PasswordGeneratorV1Component;
  let fixture: ComponentFixture<PasswordGeneratorV1Component>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PasswordGeneratorV1Component],
        providers: [
          {
            provide: FormBuilder,
            useValue: {
              group: () => ({
                get: () => ({
                  valueChanges: {
                    pipe: () => ({ subscribe: () => {} }),
                  },
                }),
              }),
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
    fixture = TestBed.createComponent(PasswordGeneratorV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create password with special chars', () => {
    fixture = TestBed.createComponent(PasswordGeneratorV1Component);
    component = fixture.componentInstance;
    const password = component.createpassword(
      'asdf',
      'somesite.com',
      'a1b2c3d4',
      15,
      99,
      true,
      '!#$%&()*+,-./:;<=>?@[]^_`{|}~'
    );
    expect(password).toEqual('HOeA5>+*i8RCLIZ');
  });

  it('should create password with special chars but different password', () => {
    fixture = TestBed.createComponent(PasswordGeneratorV1Component);
    component = fixture.componentInstance;
    const password = component.createpassword(
      'asdfg',
      'somesite.com',
      'a1b2c3d4',
      15,
      99,
      true,
      '!#$%&()*+,-./:;<=>?@[]^_`{|}~'
    );
    expect(password).toEqual('zqJ8L;<,4B`NbUC');
  });

  it('should create password without special chars', () => {
    fixture = TestBed.createComponent(PasswordGeneratorV1Component);
    component = fixture.componentInstance;
    const password = component.createpassword(
      'asdf',
      'somesite.com',
      'a1b2c3d4',
      15,
      99,
      false,
      '!#$%&()*+,-./:;<=>?@[]^_`{|}~'
    );
    expect(password).toEqual('fSqOJ836woPUajb');
  });
});
