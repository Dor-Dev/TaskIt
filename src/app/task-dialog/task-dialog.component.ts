import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Task } from '../model/task';
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit{
  task_form!: FormGroup;
  taskToCreate: Task = {} as Task;
  // myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // };
important: boolean = false;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: Task) {}
  
    
    
ngOnInit() {
      this.task_form = this.fb.group({
          description: ['',Validators.required],
          title: ['',Validators.required]
      });
  }

save() {
    this.dialogRef.close(this.task_form.value);
}

close() {
    this.dialogRef.close();
}
}
