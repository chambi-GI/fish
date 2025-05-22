import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbRatingModule, NgbPaginationModule, NgbAccordionModule, NgbTooltipModule, NgbNavModule, NgbCollapseModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SharedModule } from "../../shared/shared.module";
import { ShopsRoutingModule } from "./shops-routing.module";
import { ProductByCategoryComponent } from './shop-grid-ls/product-by-category.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { CheckoutDetailsComponent } from './checkout-details/checkout-details.component';
import { CheckoutShippingComponent } from './checkout-shipping/checkout-shipping.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { ComparisonComponent } from './comparison/comparison.component';


@NgModule({
  declarations: [
    ProductByCategoryComponent,
    ProductItemComponent,
    ShopCartComponent,
    CheckoutDetailsComponent,
    CheckoutShippingComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutCompleteComponent,
    OrderTrackingComponent,
    ComparisonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgbNavModule,
    NgxPaginationModule,
    NgbCollapseModule,
    NgbProgressbarModule,
    // NgxSliderModule,
    SharedModule,
    ShopsRoutingModule,
    SlickCarouselModule,
    NgxImageZoomModule
  ]
})
export class ShopsModule { }
