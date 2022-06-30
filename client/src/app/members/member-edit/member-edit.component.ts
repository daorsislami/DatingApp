import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  
  @ViewChild('editForm') editForm: NgForm // this gives us access to this template form inside our component
  member: Member;
  user: User;
  
  // what this allows us to do is access our browser events. e.g. if user is modifiying form
  // and he want to go to another website or close the tab, this code will prompt the user an alert
  // saying do you want to leave the page
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  } 

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => this.member = member);
  }

  updateMember() {
    console.log(this.member);
    
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
    
      // after we update the member we can reset the form
      // method reset, just restarts the form to how it was before
      this.editForm.reset(this.member); // this will reset the form with the updated member
    })
  }

}
