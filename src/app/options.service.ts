import { Injectable } from '@angular/core';
import { Options } from './options';
import { BehaviorSubject } from 'rxjs';

export const VERSION = {
  ONE: 1,
  TWO: 2,
};

export const DEFAULT_VERSION = VERSION.TWO;

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  observedVersion: BehaviorSubject<number>;

  constructor() {
    this.observedVersion = new BehaviorSubject<number>(
      this.getCurrentVersion()
    );
  }

  static getStorageKeyForCurrentVersion(): string {
    return 'version';
  }

  static getStorageKeyForVersionData(version: number): string {
    return `options_v${version}`;
  }

  getCurrentVersion(): number {
    const versionString = localStorage.getItem(
      OptionsService.getStorageKeyForCurrentVersion()
    );
    if (versionString) {
      return Number(versionString).valueOf();
    }

    return DEFAULT_VERSION;
  }

  storeCurrentVersion(version: number) {
    window.localStorage.setItem(
      OptionsService.getStorageKeyForCurrentVersion(),
      `${version}`
    );

    this.observedVersion.next(version);
  }

  getOptionsForCurrentVersion(): Options {
    return this.getOptionsForVersion(this.getCurrentVersion());
  }

  getOptionsForVersion(version): Options {
    const dataJson = localStorage.getItem(
      OptionsService.getStorageKeyForVersionData(version)
    );
    if (dataJson) {
      const data = JSON.parse(dataJson);
      const options = { ...data } as Options;

      if (options.version === version) {
        return options;
      }
    }

    return null;
  }

  storeOptions(data: Options): void {
    data.salt = data.salt.toLowerCase().trim();
    data.specialChars = data.specialChars.trim();

    localStorage.setItem(
      OptionsService.getStorageKeyForVersionData(data.version),
      JSON.stringify(data)
    );
  }
}
