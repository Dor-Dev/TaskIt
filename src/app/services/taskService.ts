import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, DocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { Task } from '../model/task';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.tasksCollection = this.afs.collection<Task>('tasks');
  }

  getTasksByUser(userID: string) {
    const task = this.afs.collection<Task>('tasks', ref=> ref.where('userID', '==', userID)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Task;
          const id = action.payload.doc.id;
          return { ...data,
            id
          };
        });
      })
    );
    return task;
    
  }

  getTaskById(taskId: string): Observable<Task> {
    return this.afs.collection<Task>('tasks').doc(taskId).get().pipe(
      map((doc,index:number) => {
        const data = doc.data() as Task;
        const docId = doc.id;
        return {  ...data, index: index +1};
      })
    );
  }

//   addTask(task: Task): Observable<DocumentReference<Task>> {
//     const userId = this.authService.getLoggedInUser().id;
//     const taskWithUserId = { ...task, userID: userId };
//     return from(this.afs.collection<Task>('tasks').add(taskWithUserId));
//   }

addTask(task: Task): Promise<DocumentReference<Task>> {
    const collection = this.afs.collection<Task>('tasks');
    return collection.get().toPromise().then((querySnapshot: QuerySnapshot<Task> | undefined) => {
      // set the task ID field
      console.log("TASK" , task);
      
      return collection.add(task);
    }).catch((error: any) => {
      console.error('Error adding task: ', error);
      throw error;
    });
  }


 async deleteTask(docID: string): Promise<void> {
    const collection = this.afs.collection<Task>('tasks');
    return collection.doc(docID).delete().then(() => {
    console.log(`Task ${docID} deleted successfully`);
  }).catch((error: any) => {
    console.error(`Error deleting task ${docID}:`, error);
    throw error;
  });
}
  
  
  
}