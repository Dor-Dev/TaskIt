import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from '../model/task';
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit{
  task_form!: FormGroup;

  taskToCreate: ITask = {} as ITask;
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: ITask) {}
  
    
    
    ngOnInit() {
      this.task_form = this.fb.group({
          description: ['',Validators.required]
          
      });
  }

  save() {
    this.dialogRef.close(this.task_form.value);
}

close() {
    this.dialogRef.close();
}
}
