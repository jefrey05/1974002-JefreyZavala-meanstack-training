import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {

  dataSource:any = null;
  displayedColumns: string[] = ['id', 'name', 'task', 'deadline'];
  constructor(public taskSer:TaskService) { }

  ngOnInit(): void {
    this.taskSer.getTasks().toPromise()
    .then((res)=>{
      this.dataSource = res;
      console.log(res);
    })
  }
  storeTask(taskRef:any){
    console.log(taskRef);
    this.taskSer.storeTask(taskRef);
  }
}
