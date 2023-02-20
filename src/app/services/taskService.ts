import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private afs: AngularFirestore) {
    this.tasksCollection = this.afs.collection<Task>('tasks');
  }

  getTasksByUser(userID: string) {
    return this.afs.collection<Task>('tasks', ref=> ref.where('userID', '==', userID)).valueChanges();
  }
  
  
}