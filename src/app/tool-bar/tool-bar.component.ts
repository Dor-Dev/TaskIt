import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent {
  constructor(private authService: AuthService, private router:Router){}

  public logout():void{
    console.log("HELLLOOOO");
    
    this.authService.logout();
    this.router.navigate(['../login']);
  }
}
