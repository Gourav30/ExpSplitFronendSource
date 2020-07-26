import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { UserdashboardComponent } from './dashboard/userdashboard/userdashboard.component';
import { GroupViewComponent } from './group/group-view/group-view.component';
import { SignupComponent } from './user/signup/signup.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { AddexpenseComponent } from './expense/addexpense/addexpense.component';
import { ViewExpenseComponent } from './expense/view-expense/view-expense.component';
import { UserRouteguardService } from './shared/user-routeguard.service';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
