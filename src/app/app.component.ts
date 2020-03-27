import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'JSPass';

  toggleVersionStatus = false;
  version = 2;
  legacyIconDisplay = 'none';

  toggleThemeStatus = false;
  theme = 'light';

  ngOnInit() {
    const version = window.localStorage.getItem('version');
    if (version && Number(version) !== this.version) {
      this.version = 1;
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
      this.version = 2;
    } else {
      this.version = 1;
    }

    this.updateVersion();
  }

  updateVersion() {
    if (this.version === 2) {
      setTimeout(() => (this.toggleVersionStatus = false));
      this.legacyIconDisplay = 'none';
    } else {
      setTimeout(() => (this.toggleVersionStatus = true));
      this.legacyIconDisplay = 'inline';
    }

    window.localStorage.setItem('version', `${this.version}`);
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
