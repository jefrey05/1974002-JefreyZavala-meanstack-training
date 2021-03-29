import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public http:HttpClient) { }

  //post method for insert 
  //post method takes 2 parameter 
  //1st parameter url and 2nd parameter json data. 
  storeTask(task:any){
    this.http.post("http://localhost:3000/tasks",task).
    subscribe(result=>console.log(result),error=>console.log(error));
  }

  getTasks(){
    return this.http.get("http://localhost:3000/tasks")
    
  }
}
