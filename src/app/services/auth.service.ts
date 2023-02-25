import { Host, Injectable } from '@angular/core';
import { User } from '../User';
import {auth} from '../firebase/firebase'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth,public router: Router,private dialog: MatDialog) { }


  
  public async logIn(userData: User){
    let errorMessage="";
   
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
        
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Your email address is invalid. Please Enter a valid email";
            break;
          case "auth/wrong-password":
            errorMessage = "Your password is wrong.";
            break;
          case "auth/user-not-found":
            errorMessage = "User with this email doesn't exist. Please register.";
            break;
          case "auth/internal-error":
            errorMessage = "Password are missing. Please provide password with minimum 6 charcters.";
            break;
          
          default:
            errorMessage = "An undefined Error happened.";
        
      
      }
    
    
      this.dialog.open(MessageDialogComponent, {
        data: { title:"Error" , message: errorMessage }
      });
    
    });
   
    
  }

  public isLoggedIn(){
    return sessionStorage.getItem('user') !== null;
  }

  public async signUp(userData: User){
    console.log(userData);
    let errorMessage="";
   
    await auth.createUserWithEmailAndPassword(userData.email,userData.password)
    .then((result:any) => {

      
        if(result){
            result.user.updateProfile({
                displayName: userData.userName
            })
            const newUser = {
              id: result.user.uid,
              name: userData.userName,
              email: userData.email
            };
            this._saveLocalUser(newUser);
            
        }
        
    }).catch((error:any) => {
      switch (error.code) {
        case "ERROR_INVALID_EMAIL":
          errorMessage = "Your email address appears to be malformed.";
          break;
        case "auth/weak-password":
          errorMessage = "Your password is weak. Please provide password thats containts at least 6 charcters. ";
          break;
        case "auth/email-already-in-use":
          errorMessage = "User with this email already exist. Please provide another Email.";
          break;
        case "auth/missing-email":
          errorMessage = "You have to enter an Email.";
          break;
        case "auth/invalid-email":
          errorMessage = "Your email address is invalid. Please Enter a valid email";
          break;
        case "ERROR_OPERATION_NOT_ALLOWED":
          errorMessage = "Signing in with Email and Password is not enabled.";
          break;
        default:
          errorMessage = "An undefined Error happened.";
      
        
        
    }
    this.dialog.open(MessageDialogComponent, {
      data: { title:"Error" , message: errorMessage }
    });
    throw error;
  });
  
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

