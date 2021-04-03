import { Injectable } from '@angular/core';
import { Options } from './options';
import { BehaviorSubject } from 'rxjs';

export const VERSION = {
  one: 1,
  two: 2,
};

export const DEFAULT_VERSION = VERSION.two;

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
    localStorage.setItem(
      OptionsService.getStorageKeyForVersionData(data.version),
      JSON.stringify(data)
    );
  }
}
