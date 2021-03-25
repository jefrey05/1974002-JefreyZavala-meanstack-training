import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  msg:string="";

  constructor(private authService:AuthService) { }
  ngOnInit(): void {
  }
  checkData(loginRef:any) {
    let uname = loginRef.uname;
    let pass = loginRef.pass;
    let fname = loginRef.fname;
    let lname = loginRef.lname;

    let userData = this.authService.getLogInData(); 
    if(userData == null)
      userData = "[{\"user\":\"test\",\"pass\":1234}]";
    

    const data = JSON.parse(userData);

    data.push({"user":uname, "pass":pass});

    userData = JSON.stringify(data);
    
    this.authService.setLogInData(userData);
    this.msg = "Successfully registered";
  }
}
