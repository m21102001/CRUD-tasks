import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { UpdateUsersComponent } from './components/update-users/update-users.component';


@NgModule({
  declarations: [
    AllUsersComponent,
    UpdateUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
