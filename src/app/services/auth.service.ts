import { Host, Injectable } from '@angular/core';
import { User } from '../User';
import {auth} from '../firebase/firebase'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth,public router: Router,) { }


  
  public async logIn(userData: User){
    // console.log(auth.signInWithEmailAndPassword);
    
    // console.log("Email:" + userData.email +" Password: "+userData.password);
    // console.log(userData);
    // auth.createUserWithEmailAndPassword(userData.email,userData.password);
    // const user:any=  await auth.signInWithEmailAndPassword(userData.email,userData.password);
    // this._saveLocalUser(user);
    // resolve(user);

   
    return this.afAuth
      .signInWithEmailAndPassword(userData.email,userData.password)
      .then((result) => {
        // this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email
            };
            this._saveLocalUser(newUser);
            console.log("LOGIN:::::",user);
            
            this.router.navigate(['task-table']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
   
    
  }

  public isLoggedIn(){
    return sessionStorage.getItem('user') !== null;
  }

  public async signUp(userData: User){
    console.log(userData);
    
    await auth.createUserWithEmailAndPassword(userData.email,userData.password)
    .then((result:any) => {
        if(result){
            result.user.updateProfile({
                displayName: userData.userName
            })
            
            
        }
        
    }).catch((err:any) => {
        console.log(err);
        throw err;
        
        
    });
    const user = this.logIn(userData)
    this._saveLocalUser(user);
    
  }
  public logout() {
    sessionStorage.removeItem('user');
    console.log("Successfuly Logout");
    
}

public _saveLocalUser(userData : any) {
    console.log('Local User: ',userData);
    
    sessionStorage.setItem('user', JSON.stringify(userData))
    return userData;
}
public getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem('user') || 'null')
}
}