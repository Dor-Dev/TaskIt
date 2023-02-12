import { Component, Inject } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ITask } from '../model/task';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  taskID = 0;
  todo : ITask[]= [];
  in_progress : ITask[]= [] ;
  done : ITask[]= [];
  backlog : ITask[]= [] ;

  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // in_progress = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  //  backlog = ["Buy 2 Milk.","Call my wife at 14:00.","Buy food for Mikey","Go to buy charger !!!","Print the flight documents","Buy 2 Milk.","Call my wife at 14:00.","Buy food for Mikey","Go to buy charger !!!","Print the flight documents"];

  constructor(public dialog: MatDialog) {}

value = 'Clear me';
toDoSubjects=['Backlog','ToDo','In Progress' ,'Done'];
backlog_card =false;

drop(event: CdkDragDrop<ITask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
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
     this.backlog.push({
      id: this.taskID++,
      description: res['description'],
      status: "todo"

     });
      console.log("Dialog output:", res['description']);
      
    }
    
); 
}

}
