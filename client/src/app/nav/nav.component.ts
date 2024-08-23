import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDropdownModule, AsyncPipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  model: any;
  
  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  constructor(public accountService: AccountService){}

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.loginForm.value).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  logout(){
    this.accountService.logout();
  }


}
