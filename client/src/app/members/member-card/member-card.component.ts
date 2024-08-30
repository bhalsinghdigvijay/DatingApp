import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { MembersService } from '../../_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { PresenceService } from '../../_services/presence.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent implements OnInit{

  @Input() member: Member;

  constructor(
    private memberService: MembersService, 
    private toastr: ToastrService,
    public presence: PresenceService
  ){}

  ngOnInit(): void {
    
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe({
      next: () => {
        this.toastr.success("You have liked " + member.knownAs);
      }
    });
  }

}
