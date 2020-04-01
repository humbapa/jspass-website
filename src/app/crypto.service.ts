import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor() {}

  getRandomNumber(min, max): number {
    const range = max - min;
    const randomInt = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return Math.floor(min + range * (randomInt / Math.pow(2, 32)));
  }

  getRandomHash(length): string {
    const hashArray = new Uint8Array(length);
    window.crypto.getRandomValues(hashArray);
    let hash = '';
    for (let i = 0; i < length; i++) {
      const randomInt = hashArray[i] % 16;
      hash += randomInt.toString(16);
    }
    return hash;
  }
}
