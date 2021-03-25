import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public setLogInData(data:string) {
    // return this.http.get("./assets/user.json");
     localStorage.setItem("userList", data);
  }

  public getLogInData() {
    // return this.http.get("./assets/user.json");
    return localStorage.getItem("userList");
  }
  public clear(){
    localStorage.clear(); 
  }
}
