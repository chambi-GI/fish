import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { BuyerDashboardComponent } from './dashboard/buyer-dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BuyerDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [DatePipe, DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuyerModule {} 