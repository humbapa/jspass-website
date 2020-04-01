import { Component, OnInit } from '@angular/core';
import { OptionsService, DEFAULT_VERSION, VERSION } from './options.service';

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

  constructor(private optionsService: OptionsService) {}

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
  }

  toggleVersion(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.toggleVersionStatus) {
      this.version = VERSION.TWO;
    } else {
      this.version = VERSION.ONE;
    }

    this.updateVersion();
  }

  updateVersion() {
    if (this.version === VERSION.TWO) {
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
    } else {
      setTimeout(() => (this.toggleThemeStatus = true));
      document.body.classList.remove('jspass-light-theme');
      document.body.classList.add('jspass-dark-theme');
    }

    window.localStorage.setItem('theme', this.theme);
  }
}
