import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { UpdateUsersComponent } from './components/update-users/update-users.component';

const routes: Routes = [
  {
    path: 'allUser',
    component: AllUsersComponent,
    title: 'AllUsesr'
  }, {
    path: 'updateUser',
    component: UpdateUsersComponent,
    title: "UpdateUser"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
