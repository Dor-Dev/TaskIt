
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { TaskService } from '../services/taskService';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';



@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit{




  displayedColumns: string[] = ['index', 'description', 'date','comment', 'status','action'];
  dataSource = new MatTableDataSource<Task>([]);
  isEditMode = false;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  tasksCollection!: AngularFirestoreCollection<Task>;
  tasks$!: Observable<Task[]>;
  statuses = [  {value: 'To Do', viewValue: 'To Do'},  {value: 'In Progress', viewValue: 'In Progress'},  {value: 'Done', viewValue: 'Done'}];
  constructor(public afs: AngularFirestore,private authService : AuthService,private taskService: TaskService,private dialog: MatDialog) {
    
  }
  ngOnInit(): void {
    const userID = this.authService.getLoggedInUser().id;
    this.taskService.getTasksByUser(userID).subscribe(tasks => {
    this.dataSource.data = tasks.sort((a, b) => a.index - b.index);;
    });
    this.dataSource.sort = this.sort;
  }

    


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.paginator.pageSize = 10; 
    }, 0);
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  


  async onSave(row: Task) {
    const taskRef = this.afs.collection<Task>('tasks').doc(await this.taskService.getDocIdByTaskId(row.id));
    taskRef.update({ description: row.description,status: row.status , comment: row.comment})
      .then(() => {
        row.isEditMode = false;
        console.log('Task updated successfully')}
        )
      .catch((error) => console.error('Error updating status: ', error));
  }



  openAddDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { description: '', date: null, comment: '' }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        const task = {
          id:result.id,
          index: result.index,
          userID: this.authService.getLoggedInUser().id,
          description: result.description,
          comment: result.comment,
          date: result.date.toISOString().slice(0,10),
          status: 'To Do'
          
        };
        this.taskService.addTask(task).then((ref: DocumentReference<Task>) => {
          console.log('Task added with ID: ', ref.id);
        }).catch((error: any) => {
          console.error('Error adding task: ', error);
        });
      }
    });
  }

  deleteTask(task: Task): void {
    
      if (confirm('Are you sure you want to delete this task?')) {
        this.taskService.getDocIdByTaskId(task.id).then((docId: string) => {
          this.taskService.deleteTask(docId).then(() => {
            console.log('Task deleted');
          }).catch((error: any) => {
            console.error('Error deleting task: ', error);
          });
        }).catch((error: any) => {
          console.error('Error getting document ID: ', error);
        });
      }
    
  }
    
}
