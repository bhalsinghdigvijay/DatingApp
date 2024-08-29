import { Component, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementComponent } from "../user-management/user-management.component";
import { PhotoManagementComponent } from "../photo-management/photo-management.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    NgbNavModule, 
    UserManagementComponent, 
    PhotoManagementComponent,
    CommonModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit{
  

  constructor(){}

  ngOnInit(): void {
    
  }
  
}
