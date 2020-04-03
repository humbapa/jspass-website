import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { OptionsService, VERSION } from '../options.service';
import { SiteSettingsService } from '../site-settings.service';
import { IntroBottomSheetComponent } from '../intro-bottom-sheet/intro-bottom-sheet.component';
import { PasswordGeneratorDialogComponent } from '../password-generator-dialog/password-generator-dialog.component';
import { SiteSettings } from '../site-settings';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';

import { createPasswordForDomainname } from '../../../resources/jspass/modules/crypto';

@Component({
  selector: 'app-password-generator-v2',
  templateUrl: './password-generator-v2.component.html',
  styleUrls: ['./password-generator-v2.component.scss'],
})
export class PasswordGeneratorV2Component implements OnInit, OnDestroy {
  passwordGeneratorForm: FormGroup;
  allDomains: string[];
  filteredDomains: Observable<string[]>;
  currentSettings: SiteSettings;

  @ViewChild('passwordField') passwordField;

  private unsubscribeField: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private optionsService: OptionsService,
    private siteSettingsService: SiteSettingsService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) {
    this.passwordGeneratorForm = this.formBuilder.group({
      domain: [''],
      password: [''],
      passwordLength: [
        this.optionsService.getOptionsForVersion(VERSION.TWO).passwordLength,
      ],
      useSpecialChars: [true],
      minSpecialChars: 2,
      useNumbers: [true],
      minNumbers: [2],
    });
  }

  ngOnInit(): void {
    this.allDomains = this.siteSettingsService.getUsedDomainList(VERSION.TWO);
    this.filteredDomains = this.passwordGeneratorForm
      .get('domain')
      .valueChanges.pipe(
        startWith(''),
        map((value) => {
          const filterValue = this.siteSettingsService.cleanDomainName(value);
          if (filterValue === '') {
            return [];
          }
          return this.allDomains.filter((option) =>
            option.toLowerCase().includes(filterValue)
          );
        })
      );

    this.passwordGeneratorForm
      .get('domain')
      .valueChanges.pipe(takeUntil(this.unsubscribeField))
      .subscribe((value) => {
        const settings = this.siteSettingsService.getSettingsForDomain(
          value,
          VERSION.TWO
        );
        if (
          settings &&
          (!this.currentSettings ||
            settings.domainName !== this.currentSettings.domainName)
        ) {
          this.passwordGeneratorForm.patchValue({
            ...settings,
          });
        }
        this.currentSettings = settings;
      });

    this.passwordGeneratorForm
      .get('useNumbers')
      .valueChanges.pipe(takeUntil(this.unsubscribeField))
      .subscribe((value) => {
        if (value) {
          this.passwordGeneratorForm.get('minNumbers').enable();
        } else {
          this.passwordGeneratorForm.get('minNumbers').disable();
        }
      });

    this.passwordGeneratorForm
      .get('useSpecialChars')
      .valueChanges.pipe(takeUntil(this.unsubscribeField))
      .subscribe((value) => {
        if (value) {
          this.passwordGeneratorForm.get('minSpecialChars').enable();
        } else {
          this.passwordGeneratorForm.get('minSpecialChars').disable();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeField.next();
    this.unsubscribeField.complete();
  }

  onSubmit(): void {
    if (!this.passwordGeneratorForm.valid) {
      return;
    }

    const options = this.optionsService.getOptionsForVersion(VERSION.TWO);
    if (options === null) {
      this.bottomSheet.open(IntroBottomSheetComponent);
      return;
    }

    this.siteSettingsService.storeSettings(
      {
        domainName: this.passwordGeneratorForm.value.domain,
        passwordLength: this.passwordGeneratorForm.value.passwordLength,
        useSpecialChars: this.passwordGeneratorForm.value.useSpecialChars,
        minSpecialChars: this.passwordGeneratorForm.value.minSpecialChars,
        useNumbers: this.passwordGeneratorForm.value.useNumbers,
        minNumbers: this.passwordGeneratorForm.value.minNumbers,
      } as SiteSettings,
      VERSION.TWO
    );

    createPasswordForDomainname(
      this.passwordGeneratorForm.value.domain,
      this.passwordGeneratorForm.value.password,
      {
        salt: options.salt,
        iterations: options.iterations,
        specialchars: options.specialChars,
        passwordlength: options.passwordLength,
        usespecialchars: this.passwordGeneratorForm.value.useSpecialChars,
        minspecialchars: this.passwordGeneratorForm.value.minSpecialChars,
        usenumbers: this.passwordGeneratorForm.value.useNumbers,
        minnumbers: this.passwordGeneratorForm.value.minNumbers,
      }
    ).then((password) => {
      const dialogRef = this.dialog.open(PasswordGeneratorDialogComponent, {
        data: {
          password,
        },
      });
      dialogRef.afterClosed().subscribe(() => {
        this.passwordGeneratorForm.patchValue({ password: '' });
        this.passwordField.nativeElement.focus();
      });
    });

    this.allDomains = this.siteSettingsService.getUsedDomainList(VERSION.TWO);
  }
}
