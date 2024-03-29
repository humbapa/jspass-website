import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { OptionsService } from '../../services/options.service';
import { CryptoService } from '../../services/crypto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options-form',
  templateUrl: './options-form.component.html',
  styleUrls: ['./options-form.component.scss'],
})
export class OptionsFormComponent implements OnInit {
  @Input() version: number;

  optionsForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private optionsService: OptionsService,
    private cryptoService: CryptoService,
    private router: Router
  ) {
    this.optionsForm = this.formBuilder.group({
      salt: [''],
      iterations: [1],
      passwordLength: [15],
      specialChars: ['@!?_#%.-*&$^:'],
    });
  }

  ngOnInit(): void {
    const options = this.optionsService.getOptionsForVersion(this.version);

    if (options === null) {
      const salt = this.cryptoService.getRandomHash(256);
      const iterations = this.cryptoService.getRandomNumber(1000, 10000);
      this.optionsForm.patchValue({ salt, iterations });

      if (this.version === 1) {
        this.optionsForm.patchValue({
          specialChars: '!#$%&()*+,-./:;<=>?@[]^_`{|}~',
        });
      }

      this.snackBar.openFromComponent(SnackBarComponent, {
        data: {
          message:
            'Using initial random values for salt and iterations. Please refresh the page to generate new ones.',
          icon: 'refresh',
          duration: 5000,
        },
        duration: 5000,
      });
    } else {
      this.optionsForm.patchValue(options);
    }
  }

  onSubmit(): void {
    const options = { version: this.version, ...this.optionsForm.value };

    const originalSaltLength = options.salt.length;
    const originalSpecialCharsLength = options.specialChars.length;
    options.salt = options.salt.toLowerCase().replace(/[^a-f0-9]/g, '');
    options.specialChars = options.specialChars.replace(
      /[\s\n\ra-zA-Z0-9]/g,
      ''
    );
    this.optionsForm.patchValue({
      salt: options.salt,
      specialChars: options.specialChars,
    });

    this.optionsService.storeOptions(options);

    if (
      options.salt.length !== originalSaltLength ||
      options.specialChars.length !== originalSpecialCharsLength
    ) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: {
          message:
            'One or more not allowed characters have been removed. Please recheck and save again.',
          icon: 'warning',
          duration: 5000,
        },
        duration: 5000,
      });
    } else {
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: 'Options successfully saved.', icon: 'save' },
      });
      this.router.navigate(['']);
    }
  }

  getErrorMessageForField(fieldName): string {
    const formField = this.optionsForm.get(fieldName);

    if (!formField || formField.untouched || formField.valid) {
      return '';
    }

    if (formField.errors.required) {
      return 'This field is required';
    }

    return 'Please input valid data';
  }
}
