import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  msg:string="";

  constructor(private router: Router, private authService:AuthService) { }
  ngOnInit(): void {
  }
  buttonBehaviour(loginRef:any) {
    let user1 = loginRef.user;
    let pass1 = loginRef.pass;

    const userData = this.authService.getLogInData() 
    
    if(userData == null)
      this.msg = "User not exist, please signup"
    else
    {
      const data = JSON.parse(userData)
      
      let status = 0;
      for (var i=0 ; i < data.length ; i++)
      {
          if (data[i]["user"] == user1 && data[i]["pass"] == pass1) {
            
            status = 1;
            break;
          }
      }
      
      if(status)
      {
        this.router.navigate(['/home', user1]);
      }
      else
      {
        this.msg = "Invalid credentials";
      }
    }
  }
}
