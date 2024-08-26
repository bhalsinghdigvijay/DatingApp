import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { FormGroupDirective, FormsModule, NgForm } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [FormsModule, NgbNavModule, CommonModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
  @ViewChild("editForm") editForm: NgForm;
  member: Member
  user: User;
  @HostListener("window:beforeunload", ["$event"]) unloadNotification($event){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
  ){
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(member => 
      this.member = member);
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe({
      next: () => {
        this.toastr.success("Profile updated successfully");
        this.editForm.reset(this.member);
      }
    })
    
  }

}
