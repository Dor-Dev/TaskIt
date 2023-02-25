import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../User';
import { Router } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  public email = '';
  public userName = '';
  public password = '';
  loginForm = true;

  constructor(private authService : AuthService , private router:Router){}

  public login(): void {
    try {
      const user:any =  this.authService.logIn({email: this.email , password: this.password})
      this.resetForm();
    
    } catch (error) {
      console.log("ERRRORR");
      throw error;
    }
   
   
   
  }

  public async signUp(){
    try {
      const user = await this.authService.signUp({email: this.email , password: this.password, userName: this.userName});
      
      this.resetForm();
      this.router.navigate(['../task-table']);
    } catch (error) {
      console.log("Failed to SignUP");
      throw error;
    }
      
  }
  public resetForm(){
    this.email ='';
   this.password = '';
   this.userName='';
  }
  public toggleLogin():void{
    this.resetForm();
    this.loginForm = !this.loginForm;
    console.log(this.loginForm);
    
  }
  public async loginWithGoogle(){
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await  signInWithPopup(auth, provider)
      .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);

    
    const newUser = {
      id: result.user.uid,
      name: result.user.displayName,
      email: result.user.email
    };
    console.log("Credentials: " , credential, "\nUser: ", newUser);
    this.authService._saveLocalUser(newUser);
    this.router.navigate(['../task-table']);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
  }
 
}
