
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit{

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;


  dataArrived = false; 
  displayedColumns: string[] = ['index', 'description', 'date','comment', 'status','action'];
  dataSource = new MatTableDataSource<Task>([]);
  isEditMode = false;
  minDate:any;
  
  statuses = [  {value: 'To Do', viewValue: 'To Do'},  {value: 'In Progress', viewValue: 'In Progress'},  {value: 'Done', viewValue: 'Done'}];





  constructor(public afs: AngularFirestore,private authService : AuthService,private taskService: TaskService,private dialog: MatDialog) {
    
  }
  ngOnInit(): void {
    
    const user = this.authService.getLoggedInUser();
    console.log("USER",user);
    
    this.taskService.getTasksByUser(user.id).subscribe(tasks => {
      
    
    
    this.dataSource.data = tasks.sort((a, b) => {
      return b.createDate - a.createDate; 
    }).map((task,index) => {
      return {
        ...task,
        index: index + 1
      }
    });
  
    setTimeout(() => {
      this.dataArrived = true;
    }, 1000);
    });
    this.dataSource.sort = this.sort;
    
  }

    


  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.paginator.pageSize = 10; 
    }, 10);
   
    
  }
  public isDataSourceEmpty(): boolean {
    return this.dataSource.data.length === 0;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Task, filter: string) => {
      return data.description.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
    

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  


  async onSave(row: Task) {
    const taskRef = this.afs.collection<any>('tasks').doc(row.id);
    console.log(row);
    const date = new Date(Date.parse(row.date.toString()));
    try {
      taskRef.update({ description: row.description,status: row.status , comment: row.comment, date: row.date.toLocaleDateString()})
      .then(() => {
        row.isEditMode = false;
        console.log('Task updated successfully')}
        )
      .catch((error) => {
        row.isEditMode = false;
        console.error('Error updating status: ', error)
    });
    } catch (error) {
      row.isEditMode = false;
      row.date = date;
      console.log(row.date.toLocaleDateString());
      
      taskRef.update({ description: row.description,status: row.status , comment: row.comment, date: row.date.toLocaleDateString()})
      .then(() => {
        row.isEditMode = false;
        console.log('Task updated successfully')}
        )
      .catch((error) => {
        row.isEditMode = false;
        console.error('Error updating status: ', error)
    });
    }
    
  }



  openAddDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { description: '', date: null, comment: '' }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const user = this.authService.getLoggedInUser();
        
        
        const task:any = {
          userID: user.id,
          description: result.description,
          comment: result.comment,
          date: result.date.toLocaleDateString(),
          status: 'To Do',
          createDate: Date.now()
          
        };
        
        console.log(task);
        
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
          this.taskService.deleteTask(task.id).then(() => {
            console.log('Task deleted');
          }).catch((error: any) => {
            console.error('Error deleting task: ', error);
          });
      }
    
  }

  enableEdit(row:Task) {
    this.minDate = new Date();
    row.isEditMode = true;
  }
    
}
