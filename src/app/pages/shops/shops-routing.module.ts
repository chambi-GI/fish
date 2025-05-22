import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { ProductByCategoryComponent } from './shop-grid-ls/product-by-category.component';
import { ProductItemComponent } from "./product-item/product-item.component";
import { ShopCartComponent } from "./shop-cart/shop-cart.component";
import { CheckoutDetailsComponent } from "./checkout-details/checkout-details.component";
import { CheckoutShippingComponent } from "./checkout-shipping/checkout-shipping.component";
import { CheckoutPaymentComponent } from "./checkout-payment/checkout-payment.component";
import { CheckoutReviewComponent } from "./checkout-review/checkout-review.component";
import { CheckoutCompleteComponent } from "./checkout-complete/checkout-complete.component";
import { OrderTrackingComponent } from "./order-tracking/order-tracking.component";
import { ComparisonComponent } from "./comparison/comparison.component";

const routes: Routes = [
  { path: '800a-b935-1c5a246b7ef6/:id', component: ProductByCategoryComponent },
  { path: '800a-b934-1c5a246b7ef5/:id/:id2', component: ProductItemComponent },
  { path: 'cart', component: ShopCartComponent },
  { path: 'checkout-details', component: CheckoutDetailsComponent },
  { path: 'checkout-shipping', component: CheckoutShippingComponent },
  { path: 'checkout-payment', component: CheckoutPaymentComponent },
  { path: 'checkout-review', component: CheckoutReviewComponent },
  { path: 'checkout-complete', component: CheckoutCompleteComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  { path: 'comparison', component: ComparisonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShopsRoutingModule { }
