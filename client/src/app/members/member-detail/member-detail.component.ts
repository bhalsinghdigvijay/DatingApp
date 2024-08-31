import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation, NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TimeagoModule, TimeagoPipe } from 'ngx-timeago';
import { CommonModule, DatePipe } from '@angular/common';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
import { PresenceService } from '../../_services/presence.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [
    NgbNavModule, 
    NgxGalleryModule, 
    DatePipe, 
    CommonModule, 
    MemberMessagesComponent
  ],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit{
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  active = 1;

  constructor(
    private memberService: MembersService, 
    private route: ActivatedRoute,
    public presence: PresenceService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe({
      next: (params) => {
        params.active ? this.active = Number.parseInt(params.active) : this.active = 1;
      }
    });

    this.loadMember();
    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    
  }

  getImages(): NgxGalleryImage[]{
    const imageUrls = [];
    for(const photo of this.member.photos){
      
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  loadMember(){
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe({
      next: (member) => {
        this.member = member;
        this.galleryImages = this.getImages();
      }
    });
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe({
      next: () => {
        this.toastr.success("You have liked " + member.knownAs);
      }
    });
  }

  

}
