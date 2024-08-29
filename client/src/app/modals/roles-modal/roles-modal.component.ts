import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../_models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent implements OnInit{
  activeModal = inject(NgbActiveModal);
  @Output() updateSelectedRoles = new EventEmitter();
  @Input() user: User;
  @Input() roles: any[];

	

  constructor(){}

  ngOnInit(): void {
    
  }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.activeModal.close();
  }

}
