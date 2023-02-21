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
    return this.afs.collection<Task>('tasks', ref=> ref.where('userID', '==', userID)).valueChanges();
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
      if (querySnapshot) {
        const index = querySnapshot.size + 1;
        task.index = index;
      }
      // set the task ID field
      task.id = this.afs.createId();
      return collection.add(task);
    }).catch((error: any) => {
      console.error('Error adding task: ', error);
      throw error;
    });
  }

  getDocIdByTaskId(taskId: string): Promise<string> {
    const collection = this.afs.collection<Task>('tasks');
    const query = collection.ref.where('id', '==', taskId).limit(1);
    return query.get().then((querySnapshot: QuerySnapshot<Task>) => {
      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        return docSnapshot.id;
      } else {
        throw new Error(`No document found with task ID ${taskId}`);
      }
    }).catch((error: any) => {
      console.error(`Error getting document ID for task ${taskId}:`, error);
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