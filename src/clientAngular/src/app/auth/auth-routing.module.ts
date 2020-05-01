import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import {TasksComponent} from '../components/tasks/tasks.component';

const routes: Routes = [
  {path: 'sigin', component: LoginComponent},
  {path: 'app', component: TasksComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {

}
