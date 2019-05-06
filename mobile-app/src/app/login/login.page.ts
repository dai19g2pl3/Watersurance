import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Login } from '../home/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private storage:StorageService) {}
  
  user:Login={
    name:"",
    email:"",
    password:"",
    nif:"",
    phoneNumber:""
  }

  ionViewDidEnter() {
  }

  

}
