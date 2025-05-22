import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Page Routing
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent as BuyerDashboardComponent } from './buyer/dashboard/dashboard.component';
import { BuyerFooterComponent } from './buyer/buyer-footer/buyer-footer.component';
import { HomesModule } from './homes/homes.module';

@NgModule({
  declarations: [
    BuyerDashboardComponent,
    BuyerFooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    HomesModule
  ]
})
export class PagesModule { }
