import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './storage.service';

import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicStorageModule.forRoot()
  ],
  providers: [StorageService]
})
export class StorageModule { }
