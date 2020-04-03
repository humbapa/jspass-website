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

declare const createpassword: any;

@Component({
  selector: 'app-password-generator-v1',
  templateUrl: './password-generator-v1.component.html',
  styleUrls: ['./password-generator-v1.component.scss'],
})
export class PasswordGeneratorV1Component implements OnInit, OnDestroy {
  passwordGeneratorForm: FormGroup;
  allDomains: string[];
  filteredDomains: Observable<string[]>;
  currentSettings: SiteSettings;

  @ViewChild('passwordField') passwordField;

  private unsubscribeDomainField: Subject<void> = new Subject();

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
      useSpecialChars: [true],
    });
  }

  ngOnInit(): void {
    this.allDomains = this.siteSettingsService.getUsedDomainList(VERSION.ONE);
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
      .valueChanges.pipe(takeUntil(this.unsubscribeDomainField))
      .subscribe((value) => {
        const settings = this.siteSettingsService.getSettingsForDomain(
          value,
          VERSION.ONE
        );
        if (
          settings &&
          (!this.currentSettings ||
            settings.domainName !== this.currentSettings.domainName)
        ) {
          this.passwordGeneratorForm.patchValue({
            useSpecialChars: settings.useSpecialChars,
          });
        }
        this.currentSettings = settings;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeDomainField.next();
    this.unsubscribeDomainField.complete();
  }

  onSubmit(): void {
    if (!this.passwordGeneratorForm.valid) {
      return;
    }

    const options = this.optionsService.getOptionsForVersion(VERSION.ONE);
    if (options === null) {
      this.bottomSheet.open(IntroBottomSheetComponent);
      return;
    }

    this.siteSettingsService.storeSettings(
      {
        domainName: this.passwordGeneratorForm.value.domain,
        useSpecialChars: this.passwordGeneratorForm.value.useSpecialChars,
      } as SiteSettings,
      VERSION.ONE
    );

    const password = createpassword(
      this.passwordGeneratorForm.value.password.trim(),
      this.passwordGeneratorForm.value.domain.toLowerCase().trim(),
      options.salt,
      options.passwordLength,
      options.iterations,
      this.passwordGeneratorForm.value.useSpecialChars,
      options.specialChars
    );
    const dialogRef = this.dialog.open(PasswordGeneratorDialogComponent, {
      data: {
        password,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.passwordGeneratorForm.patchValue({ password: '' });
      this.passwordField.nativeElement.focus();
    });

    this.allDomains = this.siteSettingsService.getUsedDomainList(VERSION.ONE);
  }
}
