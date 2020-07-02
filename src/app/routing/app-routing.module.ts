import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from '../pages/home/home.component';
import {ProjectsComponent} from '../pages/projects/projects.component';
import {SingleProjectComponent} from '../pages/single-project/single-project.component';
import {RegisterComponent} from '../pages/register/register.component';
import {LoginComponent} from '../pages/login/login.component';
import {CheckAuthService} from '../services/check-auth.service';
import {InvestComponent} from '../pages/invest/invest.component';
import {DashboardComponent} from '../pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [CheckAuthService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CheckAuthService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'invest/:id',
    component: InvestComponent,
    canActivate: [CheckAuthService]
  },
  {
    path: 'project/:id',
    component: SingleProjectComponent,
    canActivate: [CheckAuthService]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
