import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { GroupModule } from './group/group.module';
import { ExpenseModule } from './expense/expense.module';
import { SharedModule } from './shared/shared.module';
import { UserHttpService } from './user-http.service';
import { GroupHttpService } from './group-http.service';
import { ExpenseHttpService } from './expense-http.service';
import { UserdashboardComponent } from './dashboard/userdashboard/userdashboard.component';
import { LayoutComponent } from './shared/layout/layout.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000
    }),
    UserModule,
    SharedModule,
    DashboardModule,
    GroupModule,
    ExpenseModule,
    RouterModule.forRoot([
      {path: 'login' , component: LoginComponent, pathMatch: 'full'},
      {path : '' , redirectTo: 'login', pathMatch : 'full'},
      {path : '*' , component: LoginComponent },
      {path : '**', component: LoginComponent}
    ])

  ],
  providers: [UserHttpService,GroupHttpService,ExpenseHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
