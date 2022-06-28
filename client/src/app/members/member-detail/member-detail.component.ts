import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    // everything inside ngOnInit is synchronous, everything is gonna happen one after the other
    // there is no waiting for something
    
    this.loadMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  getImagesFromMember(): NgxGalleryImage[] {
    const imageUrl = [];
    for(const photo of this.member.photos) {
      imageUrl.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      });
    }
    return imageUrl;
  }

  loadMember() {
    // we get the member from our member service which accepts a username as parameter
    // when the user click to go to a user detail it will pass the username in url
    // so we use route to extract the 'username' part and pass it to the member service
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImagesFromMember();
    })
  }
}
