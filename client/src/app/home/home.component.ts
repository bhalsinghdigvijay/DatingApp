import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  registerMode = false;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    
  }

  registerToggle(){
    this.registerMode = ! this.registerMode;
  }

  

  cancelRegisterMode(event: boolean)
  {
    this.registerMode = event;
  }

}
