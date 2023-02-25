import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskTableComponent } from './task-table/task-table.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path: 'task-table' , component: TaskTableComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '*', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
