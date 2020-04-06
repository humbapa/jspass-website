import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { OptionsService, VERSION } from '../../services/options.service';
import { SiteSettingsService } from '../../services/site-settings.service';
import { IntroBottomSheetComponent } from '../../components/intro-bottom-sheet/intro-bottom-sheet.component';
import { PasswordGeneratorDialogComponent } from '../password-generator-dialog/password-generator-dialog.component';
import { SiteSettings } from '../../services/site-settings';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

declare const CryptoJS: any;

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

  domainSelected(event: MatAutocompleteSelectedEvent): void {
    if (event.option.value !== '') {
      this.passwordField.nativeElement.focus();
    }
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

    const password = this.createpassword(
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

  // Source: https://github.com/humbapa/jspass/blob/v1/popup.js

  createpassword(
    masterpassword,
    domainname,
    salt,
    passwordlength,
    iterations,
    usespecialchars,
    specialchars
  ): string {
    const passwordobj = CryptoJS.PBKDF2(masterpassword + domainname, salt, {
      keySize: passwordlength,
      iterations,
    });
    const passwordwordsarray = passwordobj.words;

    const chars1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const chars2 = 'abcdefghijklmnopqrstuvwxyz';
    const chars3 = '0123456789';
    const chars4 = specialchars;
    let chars = chars1 + chars2 + chars3;
    if (usespecialchars) {
      chars += chars4;
    }
    let chars1count = 0;
    let chars2count = 0;
    let chars3count = 0;
    let chars4count = 0;

    let password = '';
    let passwordchar = '';
    const charscheckindex = Math.floor(passwordlength / 3);

    for (let i = 0; i < passwordlength; i++) {
      let charstemp = chars;
      if (i >= charscheckindex) {
        if (usespecialchars && chars4count <= 2) {
          charstemp = chars4;
        } else if (chars1count <= 1) {
          charstemp = chars1;
        } else if (chars2count <= 1) {
          charstemp = chars2;
        } else if (chars3count <= 1) {
          charstemp = chars3;
        }
      }
      do {
        let charsindextemp = Math.abs(passwordwordsarray[i]) % charstemp.length;
        if (passwordwordsarray[i] < 0) {
          charsindextemp = charstemp.length - 1 - charsindextemp;
        }
        passwordwordsarray[i] += passwordwordsarray[i] + 1;
        passwordchar = charstemp[charsindextemp];
      } while (password.indexOf(passwordchar) > -1);

      if (chars1.indexOf(passwordchar) > -1) {
        chars1count++;
      } else if (chars2.indexOf(passwordchar) > -1) {
        chars2count++;
      } else if (chars3.indexOf(passwordchar) > -1) {
        chars3count++;
      } else if (usespecialchars && chars4.indexOf(passwordchar) > -1) {
        chars4count++;
      }

      password += passwordchar;
    }

    return password;
  }
}
