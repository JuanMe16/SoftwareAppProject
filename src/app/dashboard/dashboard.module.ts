import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { StorageModule } from '../storage/storage.module';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    StorageModule
  ],
  declarations: [DashboardPage],
  providers: [DashboardService]
})
export class DashboardPageModule { }
