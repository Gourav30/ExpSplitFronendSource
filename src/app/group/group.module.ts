import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateGroupComponent } from './create-group/create-group.component';
import { UserRouteguardService } from '../shared/user-routeguard.service';
import { RouterModule } from '@angular/router';

import { GroupViewComponent } from './group-view/group-view.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import {MatSelectModule} from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [CreateGroupComponent, GroupViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatSelectModule,
    ToastrModule,
    NgxPaginationModule,
    // AppRoutingModule,
    RouterModule.forChild([
      {path:'viewgroup/:groupId',component:GroupViewComponent,canActivate:[UserRouteguardService]},
      { path:'creategroup',component:CreateGroupComponent,canActivate:[UserRouteguardService]},
     ])
  ]
})
export class GroupModule { }
