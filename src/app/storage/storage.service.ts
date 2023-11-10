import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  public async set(key: string, value: any) {
    const settedValue = await this.storage.set(key, value);
    if (settedValue) return true;
    return false;
  }

  public async get(key: string) {
    const keyValue = await this.storage.get(key);
    return keyValue;
  }

  public async clear() {
    return await this.storage.clear();
  }
}
