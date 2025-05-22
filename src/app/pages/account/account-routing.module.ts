import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import {AccountOrdersComponent} from "./account-orders/account-orders.component";
import {AccountProfileComponent} from "./account-profile/account-profile.component";
import {AccountAddressComponent} from "./account-address/account-address.component";
import {AccountPaymentComponent} from "./account-payment/account-payment.component";
import {AccountWishlistComponent} from "./account-wishlist/account-wishlist.component";
import {AccountTicketsComponent} from "./account-tickets/account-tickets.component";
import {AccountSingleTicketComponent} from "./account-single-ticket/account-single-ticket.component";
import {AccountSigninComponent} from "./account-signin/account-signin.component";
import {AccountPasswordRecoveryComponent} from "./account-password-recovery/account-password-recovery.component";

const routes: Routes = [
  { path:'orders', component:AccountOrdersComponent },
  { path:'profile', component:AccountProfileComponent },
  { path:'address', component:AccountAddressComponent },
  { path:'payment', component:AccountPaymentComponent },
  { path:'wishlist', component:AccountWishlistComponent },
  { path:'tickets', component:AccountTicketsComponent },
  { path:'single-ticket', component:AccountSingleTicketComponent },
  { path:'signin', component:AccountSigninComponent },
  { path:'password-recovery', component:AccountPasswordRecoveryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
