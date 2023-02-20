import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path: 'todo' , component: TodoComponent},
  {path: 'task-table' , component: TaskTableComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
