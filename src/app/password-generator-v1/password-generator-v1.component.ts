import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { OptionsService, VERSION } from '../options.service';
import { IntroBottomSheetComponent } from '../intro-bottom-sheet/intro-bottom-sheet.component';
import { PasswordGeneratorDialogComponent } from '../password-generator-dialog/password-generator-dialog.component';

@Component({
  selector: 'app-password-generator-v1',
  templateUrl: './password-generator-v1.component.html',
  styleUrls: ['./password-generator-v1.component.scss'],
})
export class PasswordGeneratorV1Component implements OnInit {
  passwordGeneratorForm: FormGroup;

  @ViewChild('domainField') domainField;

  constructor(
    private formBuilder: FormBuilder,
    private optionsService: OptionsService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) {
    this.passwordGeneratorForm = this.formBuilder.group({
      domain: [''],
      password: [''],
      useSpecialChars: [true],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.passwordGeneratorForm.valid) {
      return;
    }

    const options = this.optionsService.getOptionsForVersion(VERSION.ONE);
    if (options === null) {
      this.bottomSheet.open(IntroBottomSheetComponent);
      return;
    }

    const password = 'asdf';
    const dialogRef = this.dialog.open(PasswordGeneratorDialogComponent, {
      data: {
        password,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.passwordGeneratorForm.patchValue({ password: '' });
      this.domainField.nativeElement.focus();
    });
  }
}
