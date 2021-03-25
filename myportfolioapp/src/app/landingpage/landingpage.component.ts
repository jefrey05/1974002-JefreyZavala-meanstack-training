import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';


export interface phoneBook {
  contact: string;
  phone: number;
}


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  userName:string = "";
  data = [];
  CONTACT_DATA: phoneBook[] = [];

  displayedColumns: string[] = ['contact', 'phone'];
  dataSource = this.CONTACT_DATA;

  constructor(private router:ActivatedRoute, private saveService:ContactService) {}
  ngOnInit(): void {
    this.userName = this.router.snapshot.params["id"]
    let info = this.saveService.getContactData(); 
    if(info == null)
      this.CONTACT_DATA = [];
    else
    {
      let info_json = JSON.parse(info);
      for (var i=0 ; i < info_json.length ; i++)
      {
        if(info_json[i]["user"] == this.userName)
          this.CONTACT_DATA.push(info_json[i]["info"]);
      }
    }

    this.dataSource = this.CONTACT_DATA;
  }

  buttonBehaviour(loginRef:any) {
    let name = loginRef.name;
    let phone = loginRef.phone;

    let contactData = this.saveService.getContactData(); 
    if(contactData == null)
      this.data = [];
    else
      this.data = JSON.parse(contactData);

    this.data.push({"user":this.userName,"info":{"contact":name, "phone":phone}});
    

    contactData = JSON.stringify(this.data);
    
    this.saveService.setContactData(contactData);

    this.CONTACT_DATA = [];
    for (var i=0 ; i < this.data.length ; i++)
    {
      if(this.data[i]["user"] == this.userName)
        this.CONTACT_DATA.push(this.data[i]["info"]);
    }
    this.dataSource = this.CONTACT_DATA;
  }
}
