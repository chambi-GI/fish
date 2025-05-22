import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerListComponent } from './sellers/seller-list/seller-list.component';

const routes: Routes = [
  {
    path: 'sellers',
    component: SellerListComponent
  }
];

@NgModule({
  declarations: [
    SellerListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { } 