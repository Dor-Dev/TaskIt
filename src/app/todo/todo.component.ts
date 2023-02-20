import { Component, Inject } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from '../model/task';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {auth} from '../firebase/firebase'
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../services/auth.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  value = 'Clear me';
  toDoSubjects=['Backlog','ToDo','In Progress' ,'Done'];
  backlog_card =false;

  private tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;
  
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] =[];

  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // in_progress = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  //  backlog = ["Buy 2 Milk.","Call my wife at 14:00.","Buy food for Mikey","Go to buy charger !!!","Print the flight documents","Buy 2 Milk.","Call my wife at 14:00.","Buy food for Mikey","Go to buy charger !!!","Print the flight documents"];

  constructor(public dialog: MatDialog,public afs: AngularFirestore,private authService : AuthService) {
    this.tasksCollection = this.afs.collection<Task>('tasks');
    this.tasks = this.tasksCollection.valueChanges();
  }

  ngOnInit(){
    
  }








  onDrop(event: CdkDragDrop<Observable<Task[]>, any, any>, column: string) {
    
  }


openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
    
  // this.dialog.open(TaskDialogComponent, {
  //   width: '250px',
  //   enterAnimationDuration,
  //   exitAnimationDuration,
  // })
  const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);
  
  dialogRef.afterClosed().subscribe(
    res => {
      
      this.afs.collection('tasks').add({
        title: res['title'],
       description: res['description'],
       column: "backlog",
       userID: this.authService.getLoggedinUser().id
      }).then((res)=>{
        //AFTER SAVING THE TASK IN FIRESTORE 
      });
      
});
}
}
