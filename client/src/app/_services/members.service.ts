
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

// TO REMEMBER!!!
/*
  Services are singleton, they're instantiated when a component needs the service and then it operates as a singleton
  and it stays alive until the application is closed.
  
  So services make good candidate for storing our applications state

  There are other state manangement solutions such as Redux, Mobex all of them are way too much for what we're doing for this app
*/

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }
  
  getMembers() {
    // we need to return members as observables, because our component is gonna be observing the data, we can use the 'of' from rxjs that returns something as obvservable
    if(this.members.length > 0) return of(this.members);

    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find(x => x.username === username);
    if(member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member);
  }
}
