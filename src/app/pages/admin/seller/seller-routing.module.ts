import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller-component/seller.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';

const routes: Routes = [
  { path: 'seller', component: SellerComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'products', component: SellerProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
