import { AuthguardGuard } from './authguard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ListComponent } from './dashboard/list/list.component';
import { MapComponent } from './dashboard/map/map.component';
import { AddComponent } from './dashboard/add/add.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthguardGuard],
    children: [
      { path: 'list', component: ListComponent },
      { path: 'map', component: MapComponent },
      { path: 'add', component: AddComponent },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
