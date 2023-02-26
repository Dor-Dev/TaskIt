
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
export class TaskTableComponent implements OnInit,AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;


  dataArrived = false; 
  displayedColumns: string[] = ['index', 'description', 'date','comment', 'status','action'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
  isEditMode = false;
  minDate:any;
  oldDateValue!: Date;
  newDateValue!: Date;
  
  statuses = [  {value: 'To Do', viewValue: 'To Do'},  {value: 'In Progress', viewValue: 'In Progress'},  {value: 'Done', viewValue: 'Done'}];





  constructor(public afs: AngularFirestore,private authService : AuthService,private taskService: TaskService,private dialog: MatDialog) {
    
  }
  ngOnInit(): void {
    
    const user = this.authService.getLoggedInUser();   
    this.taskService.getTasksByUser(user.id).subscribe(tasks => {
    this.dataSource.data = tasks.sort((a, b) => {
      return b.createDate - a.createDate; 
    }).map((task,index) => {
      return {
        ...task,
        index: index + 1,
        date: task.date.toLocaleString()

      }
    });
   
    setTimeout(() => {
      this.dataArrived = true;
    }, 0);
    });
    
    
    
  }

    


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      
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
    console.log("ROWWW",row);
    const date = new Date(row.date);
    const newDate = date.toLocaleDateString('en-US', { timeZone: 'Asia/Jerusalem' }).replace(',', '');
    
    try {
      
      await taskRef.update({ description: row.description,status: row.status , comment: row.comment, date: newDate})
      .then(() => {
        row.isEditMode = false;
        console.log('Task updated successfully',row)}
        );
      
    
    } catch (error) {
      row.isEditMode = false;
      console.error('Error #2 updating status: ', error);
    
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
        
        
        const date = result.date.toLocaleDateString('en-US', { timeZone: 'Asia/Jerusalem' }).replace(',', '');
        const task:Task = {
          userID: user.id,
          description: result.description,
          comment: result.comment,
          date: date,
          status: 'To Do',
          createDate: Date.now(),
          
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
    console.log("DATE",row.date);
    
    
  }
    
}
