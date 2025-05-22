import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './homes/index/index.component';
import { DashboardComponent as BuyerDashboardComponent } from './buyer/dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    { path: '', component: IndexComponent },
    { 
        path: 'buyer/dashboard', component: BuyerDashboardComponent, canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }


