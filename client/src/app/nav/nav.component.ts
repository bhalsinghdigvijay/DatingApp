import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    NgbDropdownModule, 
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    TitleCasePipe
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  model: any;
  
  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl("/members");
      }
    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }


}
