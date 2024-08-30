import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HomeComponent } from "./home/home.component";
import { NgxSpinnerModule } from 'ngx-spinner';
import { PresenceService } from './_services/presence.service';
import { TimeagoPipe } from 'ngx-timeago';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavComponent, 
    HomeComponent, 
    RouterLink,
    NgxSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TimeagoPipe]
})
export class AppComponent implements OnInit{
  title = 'The Dating App';
  users: any;

  constructor(private accountService: AccountService, private presence: PresenceService){}


  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem("user"));
    if(user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
    
  }

  

}
