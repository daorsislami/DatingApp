import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { map, take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  @Input() member: Member
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private accountService: AccountService, private memberService: MembersService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  // we need to provide a method so that we can set our drop zone inside the template
  // for the hasBaseDropzoneOver property
  fileOverBase(e: any){
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader() {
    // inside here we add the configuration that we need
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token, // we need to use our authtoken because this won't go via our http interceptor 
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true, // remove the photo from the dropzone after we upload
      autoUpload: false, // we're gonna make the user click a button
      maxFileSize: 10 * 1024 * 1024 // set the maximum of Cloudinary will take on free account so 10MB 
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; // otherwise we're gonna need to make an adjustment to our API CORS configuration and allow credentials to go up with our request
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }

  makeMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      
      // this stores our user with our photo in local storage
      // so that when we close the browser and open it we'll have the changes that we made to the photo
      this.accountService.setCurrentUser(this.user); 

      this.member.photoUrl = photo.url; // set the current member the photoUrl
      
      // loop through members photos and set the isMain to true to the one we clicked to be the main photo
      // and set the isMain to false to the previous photo 
      this.member.photos.forEach(p => {
        if(p.isMain) p.isMain = false;
        if(p.id === photo.id) p.isMain = true;
      })
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      // this returns an array of all of the photos that are not equal to the photo id we passing it here
      this.member.photos = this.member.photos.filter(x => x.id !== photoId); 
    })
  }
}
