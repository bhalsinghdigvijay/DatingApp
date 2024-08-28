import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from "../members/member-card/member-card.component";
import { Pagination } from '../_models/pagination';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    CommonModule, 
    MemberCardComponent,
    NgbPaginationModule,
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  members: Partial<Member[]>;
  predicate = "liked";
  page = 1;
  pageNumber = 1;
  pageSize = 2;
  pagination: Pagination;


  constructor(private memberService: MembersService){}

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      }
    });
  }

  pageChange(event: any) {
    this.pageNumber = event;
    this.loadLikes();
  }

  toggleLikes(event: any) {
    this.predicate = event.target.attributes['value'].value;
    this.loadLikes();
  }

}
