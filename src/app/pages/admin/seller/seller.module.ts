import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SellerHeaderComponent } from './seller-header/seller-header.component';
import { SellerSidebarComponent } from './seller-sidebar/seller-sidebar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller-component/seller.component';
import { ToastrModule } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';

@NgModule({
  declarations: [
    SellerComponent,
    SellerHeaderComponent,
    SellerSidebarComponent,
    FooterComponent,
    AddProductComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    SellerRoutingModule,
    ToastrModule.forRoot(),
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    AddProductModalComponent
  ],
  exports: [
    SellerHeaderComponent,
    SellerSidebarComponent,
    FooterComponent
  ]
})
export class SellerModule { }
