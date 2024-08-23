import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  
  @Output() cancelRegister = new EventEmitter();

  registrationForm = new FormGroup({
    username : new FormControl(""),
    password : new FormControl("")
  });

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ){}


  ngOnInit(): void {
    
  }

  register(){
    this.accountService.register(this.registrationForm.value).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      this.toastr.error(error.error);
      console.log(error);
    });  
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
