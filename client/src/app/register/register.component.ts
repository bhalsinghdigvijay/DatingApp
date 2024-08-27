import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, JsonPipe } from '@angular/common';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DateInputComponent } from "../_forms/date-input/date-input.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule, TextInputComponent, DateInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  
  @Output() cancelRegister = new EventEmitter();
  maxDate: Date;
  validationErrors: string[] = [];

  registrationForm: FormGroup;  
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ){}


  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  
  }

  initializeForm(){
    this.registrationForm = this.fb.group({
      gender : ["male"],
      username : ["", Validators.required],
      knownAs : ["", Validators.required],
      dateOfBirth : ["", Validators.required],
      city : ["", Validators.required],
      country : ["", Validators.required],
      password : ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword : ["", [Validators.required, this.matchValues('password')]],
  
    });
    this.registrationForm.controls.password.valueChanges.subscribe({
      next: () => {
        this.registrationForm.controls.confirmPassword.updateValueAndValidity();
      }
    });
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true};
    };
  }

  register(){
    
    this.accountService.register(this.registrationForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl("/members")
      },
      error: (error) => {
        this.validationErrors = error;
      }
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
