
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { TaskService } from '../services/taskService';



@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit{
deleteTask(_t74: any) {
throw new Error('Method not implemented.');
}
editTask(_t74: any) {
throw new Error('Method not implemented.');
}
  displayedColumns: string[] = ['index', 'description', 'date', 'status','action'];
  dataSource = new MatTableDataSource<Task>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  tasksCollection!: AngularFirestoreCollection<Task>;
  tasks$!: Observable<Task[]>;

  constructor(public afs: AngularFirestore,private authService : AuthService,private taskService: TaskService) {
    
  }
  ngOnInit(): void {
    const userID = this.authService.getLoggedinUser().id;
    this.taskService.getTasksByUser(userID).subscribe(tasks => {
    this.dataSource.data = tasks.map((task:Task,index:number)=>{
      return {
        ...task,
        index: index+1
      }
    });
  });
  }

  


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 10; 
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
