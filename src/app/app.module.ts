import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectThumbnailComponent } from './components/project-thumbnail/project-thumbnail.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockedBackendInterceptorService} from './services/mocked-backend-interceptor.service';
import { SingleProjectComponent } from './pages/single-project/single-project.component';
import { RegisterComponent } from './pages/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { InvestComponent } from './pages/invest/invest.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectThumbnailComponent,
    SingleProjectComponent,
    RegisterComponent,
    LoginComponent,
    InvestComponent,
    ProjectItemComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng5SliderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockedBackendInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
