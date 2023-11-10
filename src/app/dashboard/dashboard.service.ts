import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private storageService: StorageService) { }

  getDNI () {
    return this.storageService.get('dni');
  }
}
