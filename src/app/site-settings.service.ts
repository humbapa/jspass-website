import { Injectable } from '@angular/core';
import { SiteSettings } from './site-settings';

@Injectable({
  providedIn: 'root',
})
export class SiteSettingsService {
  constructor() {}

  static getStorageKeyForSiteSettingsData(version: number): string {
    return `sitesettings_v${version}`;
  }

  cleanDomainName(domain: string): string {
    return domain.toLowerCase().trim();
  }

  getSettingsForDomain(domain: string, version: number): SiteSettings {
    const cleanDomainName = this.cleanDomainName(domain);

    const settingsMatch = this.getAllSettings(version).find(
      (item) => item.domainName === cleanDomainName
    );
    if (settingsMatch) {
      return settingsMatch;
    }

    return null;
  }

  getAllSettings(version: number): SiteSettings[] {
    let data = new Array<SiteSettings>();

    const dataJson = localStorage.getItem(
      SiteSettingsService.getStorageKeyForSiteSettingsData(version)
    );

    if (dataJson) {
      data = JSON.parse(dataJson);
    }

    return data;
  }

  getUsedDomainList(version: number): string[] {
    const usedDomains = new Array<string>();
    this.getAllSettings(version).forEach((setting) => {
      usedDomains.push(setting.domainName);
    });

    return usedDomains;
  }

  storeSettings(settingsItem: SiteSettings, version: number): void {
    const allSettings = this.getAllSettings(version);

    settingsItem.domainName = this.cleanDomainName(settingsItem.domainName);

    const matchedIndex = allSettings.findIndex(
      (item) => item.domainName === settingsItem.domainName
    );
    if (matchedIndex !== -1) {
      allSettings[matchedIndex] = settingsItem;
    } else {
      allSettings.push(settingsItem);
    }

    localStorage.setItem(
      SiteSettingsService.getStorageKeyForSiteSettingsData(version),
      JSON.stringify(allSettings)
    );
  }
}
