import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  public setContactData(data:string) {
     localStorage.setItem("contactList", data);
  }

  public getContactData() {
    return localStorage.getItem("contactList");
  }
  public clear(){
    localStorage.clear(); 
  }

}
