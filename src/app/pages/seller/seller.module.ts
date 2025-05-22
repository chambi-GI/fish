import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerDashboardComponent } from './dashboard/seller-dashboard.component';
import { SellerProfileComponent } from './profile/seller-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: SellerDashboardComponent
  },
  {
    path: 'profile',
    component: SellerProfileComponent
  }
];

@NgModule({
  declarations: [
    SellerDashboardComponent,
    SellerProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class SellerModule { } 