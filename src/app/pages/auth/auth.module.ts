import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterBuyerComponent } from './register/register-buyer/register-buyer.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterBuyerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
