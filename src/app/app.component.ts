import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  OptionsService,
  DEFAULT_VERSION,
  VERSION,
} from './services/options.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'JSPass';

  toggleVersionStatus = false;
  version = DEFAULT_VERSION;
  legacyIconDisplay = 'none';

  toggleThemeStatus = false;
  theme = 'light';

  constructor(
    private optionsService: OptionsService,
    private overlayContainer: OverlayContainer,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const version = this.optionsService.getCurrentVersion();
    if (version !== this.version) {
      this.version = version;
      this.updateVersion();
    }

    const theme = window.localStorage.getItem('theme');
    if (theme && theme !== this.theme) {
      this.theme = 'dark';
      this.updateTheme();
    }

    this.swUpdate.available.subscribe((event) => {
      const appData: any = event.available.appData;

      if (!appData.forceUpdate) {
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: {
            message: `There is an update available. Please refresh the page to activate it. ${appData.releaseNotes}`,
            icon: 'system_update',
            duration: 5000,
          },
          duration: 5000,
        });
      } else {
        const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
          data: {
            message: `There is an update available. The current page will reload automatically to activate it. ${appData.releaseNotes}`,
            icon: 'system_update',
            duration: 5000,
          },
          duration: 5000,
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.swUpdate.activateUpdate().then(() => document.location.reload());
        });
      }
    });
  }

  toggleVersion(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.toggleVersionStatus) {
      this.version = VERSION.two;
    } else {
      this.version = VERSION.one;
    }

    this.updateVersion();
  }

  updateVersion() {
    if (this.version === VERSION.two) {
      setTimeout(() => (this.toggleVersionStatus = false));
      this.legacyIconDisplay = 'none';
    } else {
      setTimeout(() => (this.toggleVersionStatus = true));
      this.legacyIconDisplay = 'inline';
    }

    this.optionsService.storeCurrentVersion(this.version);
  }

  toggleTheme(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.toggleThemeStatus) {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }

    this.updateTheme();
  }

  gotoExtension(event) {
    event.preventDefault();
    event.stopPropagation();

    document.location.href =
      'https://chrome.google.com/webstore/detail/jspass/hbofdeafjgfikkakjdgmlfojabijcdan';
  }

  gotoHelp(event) {
    event.preventDefault();
    event.stopPropagation();

    document.location.href =
      'https://github.com/humbapa/jspass/blob/master/README.md';
  }

  updateTheme() {
    if (this.theme === 'light') {
      setTimeout(() => (this.toggleThemeStatus = false));
      document.body.classList.remove('jspass-dark-theme');
      document.body.classList.add('jspass-light-theme');
      this.overlayContainer
        .getContainerElement()
        .classList.remove('jspass-dark-theme');
      this.overlayContainer
        .getContainerElement()
        .classList.add('jspass-light-theme');
    } else {
      setTimeout(() => (this.toggleThemeStatus = true));
      document.body.classList.remove('jspass-light-theme');
      document.body.classList.add('jspass-dark-theme');
      this.overlayContainer
        .getContainerElement()
        .classList.remove('jspass-light-theme');
      this.overlayContainer
        .getContainerElement()
        .classList.add('jspass-dark-theme');
    }

    window.localStorage.setItem('theme', this.theme);
  }
}
