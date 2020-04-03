import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OverlayContainer } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { OptionsPageComponent } from './options-page/options-page.component';
import { OptionsFormComponent } from './options-form/options-form.component';
import { IntroBottomSheetComponent } from './intro-bottom-sheet/intro-bottom-sheet.component';
import { PasswordGeneratorPageComponent } from './password-generator-page/password-generator-page.component';
import { PasswordGeneratorV1Component } from './password-generator-v1/password-generator-v1.component';
import { PasswordGeneratorV2Component } from './password-generator-v2/password-generator-v2.component';
import { PasswordGeneratorDialogComponent } from './password-generator-dialog/password-generator-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    OptionsPageComponent,
    OptionsFormComponent,
    IntroBottomSheetComponent,
    PasswordGeneratorPageComponent,
    PasswordGeneratorV1Component,
    PasswordGeneratorV2Component,
    SnackBarComponent,
    PasswordGeneratorDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatDividerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatChipsModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'jspass-snack-bar',
      },
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        autoFocus: false,
        width: 384,
        closeOnNavigation: true,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('jspass-light-theme');
  }
}
