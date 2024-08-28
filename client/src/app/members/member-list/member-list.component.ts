import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";
import { Observable, take } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Pagination } from '../../_models/pagination';
import { NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';
import { UserParams } from '../../_models/userParams';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    MemberCardComponent, 
    AsyncPipe,
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgbTooltipModule
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  page = 1;
  pageSize = 5;
  user: User;
  userParams: UserParams;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];

  constructor(
    private memberService: MembersService
  ){
    this.userParams = this.memberService.getUserParams();
  }


  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe({
      next: (response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      }
    });
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  sortMembers(event: any) {
    this.userParams.orderBy = event.target.attributes['value'].value;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }


  pageChange(event: any) {  
    this.userParams.pageNumber = event;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }
  


  

}
