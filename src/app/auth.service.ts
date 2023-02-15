import { Host, Injectable } from '@angular/core';
import { User } from './User';
import {auth} from '././firebase/firebase'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }


  
  public async logIn(userData: User){
    // console.log(auth.signInWithEmailAndPassword);
    
    // console.log("Email:" + userData.email +" Password: "+userData.password);
    // console.log(userData);
    // auth.createUserWithEmailAndPassword(userData.email,userData.password);
    const user=  await auth.signInWithEmailAndPassword(userData.email,userData.password);
    console.log(user);
    this._saveLocalUser(user);
   
    
  }
  
  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
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
public getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('user') || 'null')
}
}