import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterBuyerComponent } from './register/register-buyer/register-buyer.component';
import { BuyerLoginComponent } from './buyer-login/buyer-login.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'buyer-register', component: RegisterBuyerComponent },
  { path: 'buyer-login', component: BuyerLoginComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }




