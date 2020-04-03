import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { OptionsService } from '../options.service';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-options-form',
  templateUrl: './options-form.component.html',
  styleUrls: ['./options-form.component.scss'],
})
export class OptionsFormComponent implements OnInit, OnDestroy {
  optionsForm: FormGroup;

  @Input() version: number;

  private snackBarRef: MatSnackBarRef<SnackBarComponent>;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private optionsService: OptionsService,
    private cryptoService: CryptoService
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

      this.snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
        data: {
          message:
            'Generated initial random values for salt and iterations, refresh the page to generate new ones.',
          duration: 8000,
        },
        duration: 8000,
      });
    } else {
      this.optionsForm.patchValue(options);
    }
  }

  ngOnDestroy(): void {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  onSubmit(): void {
    const options = { version: this.version, ...this.optionsForm.value };
    this.optionsService.storeOptions(options);
    this.snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message: 'Options successfully saved.' },
    });
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
