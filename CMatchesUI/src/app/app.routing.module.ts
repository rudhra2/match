/** This module is used for routing throughout the application */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FavlistComponent} from './favlist/favlist.component'
import { FavlistdetailComponent } from './favlistdetail/favlistdetail.component';



const routes: Routes = [

    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'favlist',component: FavlistComponent },
    {path : 'favlistdetail',component: FavlistdetailComponent}
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoute {
}
