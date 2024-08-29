import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/user';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  users: Partial<User[]>;
  private modalService = inject(NgbModal);

  constructor(private adminService: AdminService){}

  ngOnInit(): void {
    this.getUserWithRoles();
  }

  getUserWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: (users) => {
        this.users = users;
      }
    });
  }

  open(user: User) {
    
		const modalRef = this.modalService.open(RolesModalComponent);
		modalRef.componentInstance.user = user;
    modalRef.componentInstance.roles = this.getRolesArray(user);
    modalRef.componentInstance.updateSelectedRoles.subscribe({
      next: (values) => {
        const rolesToUpdate = {
          roles: [...values.filter(e1 => e1.checked === true).map(e1 => e1.name)]
        };
        if(rolesToUpdate) {
          this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe({
            next: () => {
              user.roles = [...rolesToUpdate.roles];
            }
          });
        }
      }
    });
	}

  getRolesArray(user: User){
    const roles = [];
    const userRoles = user.roles;
    const availabelRoles: any[] = [
      {name: "Admin", value: "Admin"},
      {name: "Moderator", value: "Moderator"},
      {name: "Member", value: "Member"},
    ];

    availabelRoles.forEach(role => {
      let isMatch = false;
      for(const userRole of userRoles) {
        if(role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if(!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    });
    return roles;
  }

}
