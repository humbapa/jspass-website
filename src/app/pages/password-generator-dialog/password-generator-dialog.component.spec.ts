import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGeneratorDialogComponent } from './password-generator-dialog.component';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('PasswordGeneratorDialogComponent', () => {
  let component: PasswordGeneratorDialogComponent;
  let fixture: ComponentFixture<PasswordGeneratorDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PasswordGeneratorDialogComponent],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} },
          { provide: MatSnackBar, useValue: {} },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordGeneratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
